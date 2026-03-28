// src/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/create-note.ts
//import {fetch} from "@tauri-apps/plugin-http";
// import { API_BASE_PATH } from "@/lib/constants.ts";
import {db} from "@/lib/db"
import {getNoteById} from "@/lib/utils/db"

interface Props {
    parentNoteId?: string
    groupId?: string
    libraryId: string
}

export const createNote = async (value: Props) => {
    // const res = await fetch(
    //     `${API_BASE_PATH}/api/db/note`,
    //     {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             ...value,
    //             name: '无标题文档',
    //             text: '',
    //         })
    //     }
    // )
    // const json = await res.json()
    // return json.note

    const sql = `INSERT INTO note
                     (libraryId, name, text, ${value.groupId ? 'groupId' : 'parentNoteId'})
                 VALUES ($1, $2, $3, $4)`
    const res = await db.execute(
        //   await db.execute(
        sql,
        [
            value.libraryId,
            '无标题文档',
            '',
            value.groupId ? value.groupId : value.parentNoteId,
        ]
    );

    console.log(res.lastInsertId)

    return await getNoteById(res.lastInsertId!.toString())
    }