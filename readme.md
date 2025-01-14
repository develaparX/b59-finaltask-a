# FINALTASK SESI 1 DUMBWAYS BATCH 59

Untuk Jawaban nomor 4a berikut querynya :

-- Tampilkan seluruh data dari tabel heroes_tb beserta type dari hero tersebut
SELECT h.id, h.name AS hero_name, t.name AS type_name, h.photo, h.user_id
FROM heroes_tb h
JOIN type_tb t ON h.type_id = t.id;

-- Tampilkan seluruh data heroes_tb berdasarkan type tertentu (contoh: Mage)
SELECT h.id, h.name AS hero_name, t.name AS type_name, h.photo, h.user_id
FROM heroes_tb h
JOIN type_tb t ON h.type_id = t.id
WHERE t.name = 'Mage';

-- Tampilkan spesifik data heroes_tb dengan type-nya (contoh: Hero A dan tipe-nya)
SELECT h.name AS hero_name, t.name AS type_name
FROM heroes_tb h
JOIN type_tb t ON h.type_id = t.id
WHERE h.name = 'Meliodas';

-- Tampilkan menambahkan data pada tabel heroes
INSERT INTO heroes_tb (name, type_id, "desc", photo, user_id)
VALUES ('Hero D', 14, 'Ini deskripsi hero', 'photoD.jpg', 2);
.

# 4_wikigame WEB APP

## Description

4_wikigame is a web-based application that allows users to manage a database of heroes and their types. The application provides basic CRUD (Create, Read, Update, Delete) functionality and includes user authentication for secure access to certain features.

## Features

- **User Registration**: New users can register an account.
- **User Login**: Users can log in to access secure features.
- **Hero Management**:
  - Add heroes and their types (Login required).
  - View hero details.
  - Edit hero and type information.
  - Delete heroes and their types.

## Tech Stack

- **Backend**: [Express.js](https://expressjs.com/)
- **Database**: [Prisma](https://www.prisma.io/) as ORM
- **Frontend Templating**: [Handlebars](https://handlebarsjs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Image Uploads**: [Cloudinary](https://cloudinary.com/)
- **Authentication**: [bcrypt](https://www.npmjs.com/package/bcrypt), [express-session](https://www.npmjs.com/package/express-session), [connect-flash](https://www.npmjs.com/package/connect-flash)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/develaparX/b59-finaltask-a.git
   cd b59-finaltask-a
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=your_prisma_database_url
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SESSION_SECRET=your_session_secret
   ```

4. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. For production:
   ```bash
   npm start
   ```

## Scripts

- `npm run dev`: Starts the development server with live reload (using `nodemon`) and watches Tailwind CSS changes.
- `npm start`: Starts the production server.

## Folder Structure

```
4_wikigame
├── public
│   ├── css
│   │   ├── styles.css      # TailwindCSS input file
│   │   ├── output.css      # Compiled TailwindCSS
│   └── images             # Static images
├── views
│   ├── layouts            # Handlebars layouts
│   ├── partials           # Reusable Handlebars components
│   └── pages              # Page-specific templates
├── prisma
│   ├── schema.prisma      # Prisma schema definition
├── routes
│   ├── auth.js            # Authentication routes
│   ├── hero.js            # Hero CRUD routes
├── controllers
│   ├── authController.js  # Handles authentication logic
│   ├── heroController.js  # Handles hero CRUD logic
├── middlewares
│   ├── auth.js            # Middleware for authentication
├── index.js               # Entry point
└── .env                   # Environment variables
```

## Dependencies

- **Core**:
  - `express`
  - `prisma`
  - `handlebars`
- **Authentication**:
  - `bcrypt`
  - `express-session`
  - `connect-flash`
- **File Uploads**:
  - `multer`
  - `multer-storage-cloudinary`
  - `cloudinary`
- **Development**:
  - `nodemon`
  - `tailwindcss`
  - `postcss`
  - `autoprefixer`
  - `concurrently`

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

## Author

Created by [arfiansr].
