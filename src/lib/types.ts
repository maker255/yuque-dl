// src/lib/types.ts

export type Library = {
    id: string;
    name: string;
    description: string;
    text: string;
    showDir: boolean;
    createdAt: Date;
    updatedAt: Date;

    parentLibraryId?: string | null;
    notes: Note[]
    groups: Group[]
};

export type Group = {
    id: string;
    name: string;
    libraryId: string

    createdAt: Date;
    updatedAt: Date;
}

export type Note = {
    id: string;
    name: string;
    level: number;
    text: string;

    libraryId: string;
    groupId: string | null;
    parentNoteId: string | null;

    childrenNote?: Note[]
    library?: Library

    createdAt: Date;
    updatedAt: Date;
};
