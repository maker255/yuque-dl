// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-edit-text.tsx

import '@mantine/core/styles.css';
import TipTap from "@/components/tiptap/TipTap.tsx";
import { updateLibrary } from '../actions/update-library';
import toast from 'react-hot-toast';

const HomepageEditText = ({ id, name, text, showDir, description, setText }: {
    id: string
    name: string
    text: string
    showDir: boolean
    description: string
    setText: Function
}) => {
    return (
        <div className={`mx-4 h-full prose-lg rounded-md p-2 border`}>
            <TipTap
                onSubmit={async () => {
                    await updateLibrary({
                        id, name, text, showDir, description
                    })
                    toast.success(`保存成功`)
                }}
                onSave={async () => {
                    await updateLibrary({
                        id, name, text, showDir, description
                    })
                    toast.success(`自动保存成功`)
                }}
                slug={name}
                description={text}
                onChange={(richText) => {
                    console.log(richText);

                    setText(richText)
                }} />
        </div>
    );
};

export default HomepageEditText;
