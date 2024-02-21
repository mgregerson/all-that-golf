import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import { supabase } from "../../lib/supabase";
const storage = multer.memoryStorage(); // This stores the file in memory as a buffer

// Init multer upload
const upload = multer({ storage: storage });

export const coursesRouter = Router();

coursesRouter.post(
  "/course/upload-image/:id",
  upload.single("image"),
  async (req, res) => {
    const image = req.file;

    console.log("image=", image);

    const { id } = req.params;

    const imageBuffer = image?.buffer; // Get the buffer
      // Now you can use imageBuffer as the file buffer
    console.log("image buffer:", imageBuffer);
    

    if (image !== undefined) {
      await supabase.storage
        .from("courseBucket")
        .upload(`${id}`, image.buffer, {
          contentType: "image/webp",
          cacheControl: "3600",
        })

      const publicUrl = supabase.storage.from("courseBucket").getPublicUrl(`${id}`);
      console.log("publicUrl=", publicUrl);

      const course = await prisma.golfCourse.update({
        where: {
          id: Number(id),
        },
        data: {
          imageURL: publicUrl.data.publicUrl,
        },
      });

      console.log('')

      return res.json({ url: publicUrl});
    }
    
    res.json({ image: "received image" });
  }
);



coursesRouter.post("/add-course", async (req, res) => {
  try {
    const {
      courseName,
      city,
      state,
      description,
      distanceInYards,
      numHoles,
      zipCode,
      price,
      phoneNumber,
      par,
    } = req.body;
    
    const newCourse = await prisma.golfCourse.create({
      data: {
        name: courseName,
        city,
        state,
        description,
        distanceInYards: parseInt(distanceInYards),
        numHoles: parseInt(numHoles),
        zipCode: parseInt(zipCode),
        price: parseFloat(price),
        phoneNumber,
        par: parseInt(par),
      },
    });

    console.log("newCourse=", newCourse);

    return res.json(newCourse);
  } catch (error) {
    console.log('error=', error)
    res.json({ error });
  }
});

coursesRouter.get("/", async (req, res) => {
  try {
    const courses = await prisma.golfCourse.findMany();
    res.json(courses);
  } catch (error) {
    res.json({ error });
  }
});

coursesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.golfCourse.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.json(course);
  } catch (error) {
    res.json({ error });
  }
});

coursesRouter.get("/search/:term", async (req, res) => {
  const { term } = req.params;

  try {
    const courses = await prisma.golfCourse.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            city: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            state: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    res.json(courses);
  } catch (error) {
    res.json({ error });
  }
});

coursesRouter.get("/state/:state", async (req, res) => {
  const { state } = req.params;

  try {
    const courses = await prisma.golfCourse.findMany({
      where: {
        state: state,
      },
    });

    res.json(courses);
  } catch (error) {
    res.json({ error });
  }
});

coursesRouter.get("/city/:city", async (req, res) => {
  const { city } = req.params;

  try {
    const courses = await prisma.golfCourse.findMany({
      where: {
        city: city,
      },
    });

    res.json(courses);
  } catch (error) {
    res.json({ error });
  }
});

coursesRouter.get("/zip/:zip", async (req, res) => {
  const { zip } = req.params;

  try {
    const courses = await prisma.golfCourse.findMany({
      where: {
        zipCode: Number(zip),
      },
    });

    res.json(courses);
  } catch (error) {
    res.json({ error });
  }
});
