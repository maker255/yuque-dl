// src/app/(knowledge)/[username]/[libraryId]/_components/homepage-dir.tsx

import { Library, Note } from "@/lib/types";
import HomepageDirItem from "@/app/(knowledge)/[username]/[libraryId]/_components/homepage-dir-item";
import { useEffect, useState } from "react";
import { getNotesById } from "@/lib/utils/db.ts";

const HomepageDir = ({ library }: { library: Library }) => {
    const [notes, setNotes] = useState<Note[]>([])

    useEffect(() => {
        (async () => {
            let notes: Note[] = []
            if (library?.notes && library?.notes.length > 0) {
                for (let note of library?.notes) {
                    const fullNote = await getNotesById(note.id)
                    if (fullNote) {
                        notes.push(fullNote)
                    }
                }
            }
            setNotes(notes)
        })()
    }, [library]);

    return (
        <div className={`w-full p-4 flex flex-col`}>
            <h2 className={`py-2 text-2xl font-semibold text-center`}>目录</h2>
            <HomepageDirItem notes={notes} />
        </div>
    );
};

export default HomepageDir;
