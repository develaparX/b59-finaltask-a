-- CreateTable
CREATE TABLE "users_tb" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "heroes_tb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "photo" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "heroes_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_tb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "type_tb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_tb_email_key" ON "users_tb"("email");

-- AddForeignKey
ALTER TABLE "heroes_tb" ADD CONSTRAINT "heroes_tb_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "heroes_tb" ADD CONSTRAINT "heroes_tb_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "type_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
