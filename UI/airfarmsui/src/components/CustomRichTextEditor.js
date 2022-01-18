import React from "react";
import { useField } from "formik"
import { EditorState, RichUtils } from "draft-js";
//import Editor from "draft-js-plugins-editor";
import { Editor } from "react-draft-wysiwyg"
import {AuthProvider} from '../utils/AuthProvider'
import { useDispatch } from 'react-redux';
import { commentImageAction } from '../storeActions';
import "../App.css";


function CustomRichTextEditor (props) {

    const [field, meta, helpers] = useField(props.name);
    const dispatch = useDispatch()

//   onAddLink = () => {
//     const editorState = this.state.editorState;
//     const selection = editorState.getSelection();
//     const link = window.prompt("Paste the link -");
//     if (!link) {
//       this.onChange(RichUtils.toggleLink(editorState, selection, null));
//       return "handled";
//     }
//     const content = editorState.getCurrentContent();
//     const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
//       url: link
//     });
//     const newEditorState = EditorState.push(
//       editorState,
//       contentWithEntity,
//       "create-entity"
//     );
//     const entityKey = contentWithEntity.getLastCreatedEntityKey();
//     this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
//     return "handled";
//   };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(
            field.value,
            command
            );
            if (newState) {
                helpers.setValue(newState);
                return "handled";
            }
            return "not-handled";
    };

    const onUnderlineClick = () => {
        helpers.setValue(
        RichUtils.toggleInlineStyle(field.value, "UNDERLINE")
        );
    };

    const onBoldClick = () => {
        helpers.setValue(RichUtils.toggleInlineStyle(field.value, "BOLD"));
    };

    const onItalicClick = () => {
        helpers.setValue(
        RichUtils.toggleInlineStyle(field.value, "ITALIC")
        );
    };

    const onStrikeThroughClick = () => {
        helpers.setValue(
        RichUtils.toggleInlineStyle(field.value, "STRIKETHROUGH")
        );
    };

    function uploadImageCallBack(file) {

        return new Promise(
          async (resolve, reject) => {
            const data = new FormData();
            data.append('pic', file);
            data.append('comment', '10');
            let config = {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
            const authProvider = AuthProvider()
            await authProvider.authPost(`http://127.0.0.1:8000/activity/picture/comments/handle/`, data, config, false)
            .then(res =>{
                console.log(res);
                console.log(res.data);
                const imageData = {
                    picture : res.data.pic,
                    name: file.name,
                    type: file.type,
                    comment_pic_id: res.data.id
                }
                dispatch(commentImageAction(imageData));
                resolve({ data: { link: res.data.pic } });

            })
            .catch(error => {
                console.log(error);
                console.log(error.data);
                reject(error);
            })
          }
        );
      }

    const EditorToolbar = {
        options: ['blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
        fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
        },
        inline: {
            inDropdown: false,
          },
        blockType: {
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
            color: 'gray',
        },
        fontFamily: {
            inDropdown: true,
            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
          },
        list: {
            inDropdown: true,
          },
        textAlign: {
            inDropdown: true,
          },
         // colorPicker: { component: ColourPicker },
        colorPicker: {
            colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
              'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
              'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
              'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
              'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
              'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
          },
        image: {
            uploadCallback: uploadImageCallBack,
            previewImage: true,
            alt: { present: false, mandatory: false },
          },
        history: {
            inDropdown: true,
          },
        link: {
            inDropdown: true,
          },
    }



    return (
        <div className="editorContainer">
            <button
                className="inline styleButton"
                id="underline"
                onClick={onUnderlineClick}
            >
            U
            </button>

            <button
                className="inline styleButton"
                id="bold"
                onClick={onBoldClick}
            >
            B
            </button>

            <button
                className="inline styleButton"
                id="italic"
                onClick={onItalicClick}
            >
            I
            </button>
            <button
                className="inline styleButton strikethrough"
                onClick={onStrikeThroughClick}
            >
            abc
            </button>

            <div className="editors">
            <Editor
                editorState={field.value}
                handleKeyCommand={handleKeyCommand}
                toolbar={EditorToolbar}
                wrapperStyle={{
                    border: "1px solid #d6d6d6",
                    padding: 5,
                    borderRadius: 10
                }}
                toolbarStyle={{
                    border: 1,
                    borderBottom: "1px solid #d6d6d6",
                    background: "transparent",
                    borderRadius: 10,
                    fontSize: "15px",
                    color: "black",
                    padding: 5,
                }}
                onEditorStateChange={(value) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
            />
            </div>
        </div>
    );
}

export default CustomRichTextEditor;
