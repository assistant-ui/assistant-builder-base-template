import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createOrUpdateUser({
  clerkId,
  email,
  firstName,
  lastName,
  imageUrl,
}: {
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}) {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    if (existingUser.length > 0) {
      const [updatedUser] = await db
        .update(users)
        .set({
          email,
          firstName,
          lastName,
          imageUrl,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, clerkId))
        .returning();
      
      return updatedUser;
    } else {
      const [newUser] = await db
        .insert(users)
        .values({
          clerkId,
          email,
          firstName,
          lastName,
          imageUrl,
        })
        .returning();
      
      return newUser;
    }
  } catch (error) {
    console.error("Error syncing user with database:", error);
    throw error;
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await db.delete(users).where(eq(users.clerkId, clerkId));
  } catch (error) {
    console.error("Error deleting user from database:", error);
    throw error;
  }
}