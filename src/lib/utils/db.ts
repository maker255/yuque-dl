import {db} from "../db";
import {Note, Library, Group} from "../types";

export async function getNotes() {
    return await db.select<Note[]>("SELECT * FROM note");
}

export async function getNotesWithLibrary() {
    let notes = await db.select<Note[]>("SELECT * FROM note");
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let library = await db.select<Library[]>("SELECT * FROM library where id=$1", [note.libraryId])
        note.library = library[0]
    }
    return notes
}

export async function getNotesById(id: string): Promise<null | Note> {
    let node = await db.select<Note[]>("SELECT * FROM note where id=$1", [id]);
    let note = node[0]
    const node_children = await db.select<Note[]>('select * from note where parentNoteId=$1', [id])

    if (!note) {
        // @ts-ignore
        return {};
    }

    if (node_children.length > 0) {
        let children = []
        for (let child of node_children) {
            const childNodes = await getNotesById(child.id);
            if (childNodes) {
                children.push(childNodes)
            }
        }
        note.childrenNote = children
    }

    return note;
}

export async function getNoteById(id: string) {
    let node = await db.select<Note[]>("SELECT * FROM note where id=$1", [id]);
    return node[0]
}

export async function getLibraries(): Promise<null | Library[]> {
    let libraries = await db.select<Library[]>("SELECT * FROM library");
    return libraries
}

export async function getLibraryById(id: string): Promise<null | Library> {
    let library = await db.select<Library[]>("SELECT * FROM library where id=$1", [id]);
    if (library.length === 0) return null;

    let notes = await db.select<Note[]>(`
        select *
        from note n
        where n.libraryId = $1
    `, [id])
    let groups = await db.select<Group[]>(`
        select *
        from tb_group n
        where n.libraryId = $1
    `, [id])
    
    library[0].notes = notes.filter(n => !n.parentNoteId)
    library[0].groups = groups 
    return library[0]
}
