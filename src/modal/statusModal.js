import React, { useState } from "react";
import ModalLayout from "../../component/modal/modalLayout";
import Modal from "react-modal";
import {
  CrossIcon,
  DeleteLessonIcon,
  PublishCourseIcon,
  UnPublishCourseIcon,
  UnsavedIcon,
} from "../icon/icon";

export default function StatusModal({
  modalstate,
  setModalstate,
  type,
  title,
  subtitle,
  parentModalstate,
  setParentModalstate,
  price,
  courseName,
  onSubmit,
  handleDeleteLesson,
  deleteLessonId,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  return (
    <Modal
      isOpen={modalstate}
      style={customStyles}
      className="status-center-modal bg-white p-6 rounded-2xl"
      onRequestClose={() => {
        setModalstate(false);
      }}
    >
      <div className="">
        {/* Svg & cross */}
        <div className="flex justify-between">
          <div></div>
          <div className="">
            {type === "unsave" ? (
              <UnsavedIcon />
            ) : type === "publishCourse" ? (
              <PublishCourseIcon />
            ) : type === "delete" ||
              type === "deleteSection" ||
              type === "deleteCourse" ? (
              <DeleteLessonIcon />
            ) : type === "unpublish" ? (
              <UnPublishCourseIcon />
            ) : (
              <></>
            )}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setModalstate(false);
            }}
          >
            <CrossIcon />
          </div>
        </div>

        <p
          className="flex items-center justify-center text-base font-semibold my-2"
          style={{ color: "#262626" }}
        >
          {title}
        </p>
        <div className="flex items-center justify-center">
          <p
            className=" text-sm font-medium inline"
            style={{ color: "#595959" }}
          >
            {subtitle + " "}
            {price ? (
              <span
                className="text-sm font-medium"
                style={{ color: "#F7941D" }}
              >
                {price + "."}
              </span>
            ) : courseName ? (
              <>
                <span className="text-sm font-semibold text-black">
                  {courseName}
                </span>
                ?
              </>
            ) : (
              <></>
            )}
          </p>
        </div>
        <div className="flex items-center justify-center">
          {type === "unsave" ? (
            <button
              className="py-4 px-5 mt-5 text-white text-sm font-semibold rounded-md "
              style={{ background: "#F7936F" }}
              onClick={() => {
                setModalstate(false);
                setParentModalstate && setParentModalstate(false);
              }}
            >
              Leave Anyway
            </button>
          ) : type === "publishCourse" ? (
            <button
              className="py-4 px-5 mt-5 text-white text-sm font-semibold rounded-md "
              style={{ background: "#66CB9F" }}
              onClick={() => {
                setModalstate(false);
                onSubmit();
              }}
            >
              Yes, publish course
            </button>
          ) : type === "delete" ? (
            <button
              className="py-4 px-5 mt-5 text-white text-sm font-semibold rounded-md "
              style={{ background: "#F16063" }}
              onClick={() => {
                handleDeleteLesson(deleteLessonId);
                setModalstate(false);
                onSubmit(courseName);
              }}
            >
              Delete lesson
            </button>
          ) : type === "unpublish" ? (
            <button
              className="py-4 px-5 mt-5 text-white text-sm font-semibold rounded-md "
              style={{ background: "#F7936F" }}
              onClick={() => {
                setModalstate(false);
                onSubmit();
              }}
            >
              Unpublish course
            </button>
          ) : type === "deleteSection" ? (
            <button
              className="py-4 px-5 mt-5 text-white text-sm font-semibold rounded-md "
              style={{ background: "#F16063" }}
              onClick={() => {
                setModalstate(false);
                onSubmit();
              }}
            >
              Delete Section
            </button>
          ) : type === "deleteCourse" ? (
            <button
              className="py-4 px-5 mt-5 text-white text-sm font-semibold rounded-md "
              style={{ background: "#F16063" }}
              onClick={() => {
                setModalstate(false);
                onSubmit();
              }}
            >
              Delete Course
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Modal>
  );
}
