CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"email" TEXT NOT NULL UNIQUE,
	"password" varchar(20) NOT NULL,
	"username" varchar(50) NOT NULL UNIQUE,
	"pictureUrl" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()'
);
CREATE TABLE sessions (
	id SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES users(id),
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	"updatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL
);


CREATE TABLE "friends" (
	"id" SERIAL PRIMARY KEY,
	"ownerId" int NOT NULL,
	"friendId" int NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()'
);


CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY,
	"userId" int NOT NULL,
	"url" TEXT NOT NULL,
	"description" TEXT,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()'
);


CREATE TABLE "hashtags" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()'
);


CREATE TABLE "posts_hashtags" (
	"id" SERIAL PRIMARY KEY,
	"postId" int NOT NULL,
	"hashtagId" int NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()'
);


CREATE TABLE "posts_likes" (
	"id" SERIAL PRIMARY KEY,
	"postId" int NOT NULL,
	"userId" int NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()'
);


ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "posts_hashtags" ADD CONSTRAINT "posts_hashtags_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "posts_hashtags" ADD CONSTRAINT "posts_hashtags_fk1" FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("id");

ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "friends" ADD CONSTRAINT "friends_fk0" FOREIGN KEY ("ownerId") REFERENCES "users"("id");
ALTER TABLE "friends" ADD CONSTRAINT "friends_fk1" FOREIGN KEY ("friendId") REFERENCES "users"("id");
