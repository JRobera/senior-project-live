import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../PostForm.css";
function ThirdForm({ formData, setFormData }) {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "align",
    "list",
    "bullet",
    "indent",
  ];

  return (
    <div className="job-post-input-wrapper">
      <label id="label-id" htmlFor="jobDescription">
        Job Description
      </label>
      <ReactQuill
        placeholder="Add description"
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={(content, delta, source, editor) =>
          setFormData({ ...formData, Job_description: content })
        }
      />
      {/* <textarea
           id="job-description"
           value={formData.jobDescription}
           onChange={(e) =>
             setFormData({ ...formData, jobDescription: e.target.value })
           }
           style={{ resize: "vertical" }}
         ></textarea> */}
    </div>
  );
}

export default ThirdForm;
