import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { auth } from "../../middleware/auth";
import { supabase } from "../../lib/supabase";
import multer from "multer";

const storage = multer.memoryStorage(); // This stores the file in memory as a buffer

// Init multer upload
const upload = multer({ storage: storage });

export const usersRouter = Router();

usersRouter.post('/register', async (req, res) => {
  console.log('got here')
  try {
    const { username, email, firstName, lastName, password } = req.body;

    const foundUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (foundUser) {
      return res.status(400).json({
        error: "A user with this email/username already exists.",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email: email.toLowerCase(),
        firstName,
        lastName
      },
    });

    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) {
      return res.status(400).json({
        error: "A user with this email/username already exists.",
      });
    }

    return res.json(newUser);
  } catch (error) {
    res.json({ error });
  }
})

usersRouter.post('/user/upload-image/:id', upload.single('image'), async (req, res) => {
  try {
    
    const image = req.file;

    console.log("image=", image);

    const { id } = req.params;

    const imgaeBuffer = image?.buffer;
    if (image !== undefined) {
      await supabase.storage.from('userImageBucket').upload(`${id}`, image.buffer, {
        contentType: 'image/webp',
        cacheControl: '3600'
      })

      const publicUrl = supabase.storage.from('userImageBucket').getPublicUrl(`${id}`);
      console.log('publicUrl=', publicUrl);

      const user = await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
          photoUrl: publicUrl.data.publicUrl
        }
      });
      res.json({ url: publicUrl });
    }
  } catch (error) {
    res.json({ error });
  }
})

usersRouter.get("/", auth, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.json({ error });
  }
});

usersRouter.get("/:id", auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(user);
  } catch (error) {
    res.json({ error });
  }
});

usersRouter.put("/:id", auth, async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(updatedUser);
  } catch (error) {
    res.json({ error });
  }
});

usersRouter.delete("/:id", auth, async (req, res) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(deletedUser);
  } catch (error) {
    res.json({ error });
  }
});

// usersRouter.post("/:id/upload/profile-image", auth, async (req, res) => {
//   try {
//     const { file, id } = req.body;
//     const uploaded = await uploadFile(file, id);
//     if (uploaded) {
//       res.json({ message: `File uploaded successfully: ${uploaded}` });
//     } else {
//       res.json({ message: "File upload failed" });
//     }
//   } catch (error) {
//     res.json({ error });
//   }
// });
