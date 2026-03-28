// src/app/(dashboard)/dashboard/library/actions/new-library.ts

import { db } from "@/lib/db"
import { getLibraryById } from "@/lib/utils/db";

export const createLibrary = async (values: {
    name: string
    description: string
}) => {
    const res = await db.execute(
        `INSERT INTO library
                (name, description, text, showDir)
                VALUES ($1, $2, $3, $4)`,
        [
            values.name,
            values.description,
            '',
            true
        ]
    );
    return await getLibraryById(res.lastInsertId!.toString())
}
