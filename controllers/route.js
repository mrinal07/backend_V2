const router = require("express").Router();
const connectDB = require("../config/connect");
const shortid = require("shortid");
const url = require("url");

// ----------------------------URL-Shortner Project-----------------------------------

// Get all url's
router.get("/get-url", async (req, res) => {
  client = connectDB;

  const db = await client.db("url-shortner-db");

  const urlCollection = await db.collection("url-shortner");

  const url = await urlCollection.find().toArray();

  try {
    res.status(200).send({
      success: "success",
      URL: url,
    });
  } catch {
    res.status(500).send({ error: "error" });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// Add single url to DB
router.post("/add-url", async (req, res) => {
  try {
    urlName = req.body.val;
    console.log(urlName);

    if (urlName) {
      uniqueNumber = shortid.generate();

      client = connectDB;

      const urlPattern = /^(https:\/\/|.*:\/\/www\.)/i;
      flag = urlPattern.test(urlName)

      originalURL =  (flag)? urlName: "https://" + urlName
      console.log(originalURL);

      await client.connect();
      const addURL = {
        shortId: uniqueNumber,
        shortUrl: "https://devmrinal.in/"+uniqueNumber,
        originalUrl: originalURL,
        numberOfClick: 0,
      };

      const database = await client.db("url-shortner-db");
      const collection = await database.collection("url-shortner");

      // check whether this URL is already exsist or not
      // if exsist we will update the shortId
      const dbResult = await collection.findOne({
        originalUrl: originalURL,
      });
      // console.log("dbResult", dbResult);

      if (dbResult) {
        const update = {
          $set: addURL,
        };
        // console.log(update);
        const result = await collection.updateOne(
          { originalUrl: originalURL },
          update
        );
        console.log("result", result);

        res.status(200).send({
          data: "https://devmrinal.in/" + uniqueNumber,
          success: true,
          message: "URL Updated Successfully",
        });
      } else {
        const result = await collection.insertOne(addURL);
        console.log("result.originalUrl", result.originalUrl);
        res.status(200).send({
          data: "https://devmrinal.in/" + uniqueNumber,
          success: true,
          message: "URL Added Successfully",
        });
      }
    } else {
      res.status(500).send({ message: "Please enter a valid URL" });
    }
  } catch (error) {
    res.status(500).send(error);
  } finally {
    // await connectDB().close();
  }
});

// short url redirect by unique id
router.get("/:data", async (req, res) => {
  try {
    // console.log(req.url);
    const parsedUrl = url.parse(req.url, true);
    // console.log(parsedUrl);
    const path = parsedUrl.pathname;
    console.log(path);
    
    // Id = String(path.split("/")).replace(",", "");
    Id = String(path.replace("/",""))
    // console.log("ShortId=> " + Id);    

    client = connectDB;

    const db = await client.db("url-shortner-db");

    const urlCollection = await db.collection("url-shortner");

    const result = await urlCollection.findOne({ shortId: Id });
    // console.log(result);
    console.log(result.originalUrl);

    res.redirect(result.originalUrl);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ----------------------------URL-Shortner Project-----------------------------------

module.exports = router;
