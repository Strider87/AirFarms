import React from "react"
import { useField } from "formik"

import { EditorState } from 'draft-js'
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import {AuthProvider} from '../utils/AuthProvider'
import { useDispatch } from 'react-redux';
import { commentImageAction } from '../storeActions';

const CustomFormikRichText: React.FC<{ name: string }> = (props) => {
    const [field, , helpers] = useField<EditorState>(props.name)
    const dispatch = useDispatch()
    function uploadImageCallBack(file: File) {

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
            await authProvider.authPost(`http://127.0.0.1:8000/activity/comments/picture/handle/`, data, config, false)
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
            //const localSrc = URL.createObjectURL(file)
            
            //xhr.send(data);
            /*xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            });*/
          }
        );
      }
    
    const EditorToolbar = {
        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
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
            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
          },
        list: {
            inDropdown: true,
          },
        textAlign: {
            inDropdown: true,
          },
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
            alt: { present: true, mandatory: true },
          },
        history: {
            inDropdown: true,
          },
        link: {
            inDropdown: true,
          },
    }

    return (
        <Editor
            toolbar={EditorToolbar}
            wrapperStyle={{
                border: "1px solid #d6d6d6",
                padding: 5,
                borderRadius: 10
            }}
            toolbarStyle={{
                border: 0,
                borderBottom: "1px solid #d6d6d6",
                background: "transparent",
                borderRadius: 10,
                fontSize: "15px",
                color: "blue"
            }}
            editorState={field.value}
            onEditorStateChange={(value) => helpers.setValue(value)}
            onBlur={() => helpers.setTouched(true)}
        />
    )
}

export default CustomFormikRichText
