import React, { Fragment, useState, memo, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { Modal } from ".";

import { TemplateDetailsContext } from "../context/templateDetails";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown = ({ title, items, type, selectVal }) => {
  const [openModal, setOpenModal] = useState(false);
  const detailsTemplate = useContext(TemplateDetailsContext);

  const selectOption = (e) => {
    detailsTemplate?.setTemplateDetails({
      ...detailsTemplate?.templateDetails,
      prompts: [
        ...detailsTemplate?.templateDetails?.prompts,
        e.target.textContent,
      ],
    });
  };

  return (
    <>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        heading={title === "Templates" ? "New template" : "New prompt"}
        type={type}
      />

      <Menu as="div" className="relative inline-block text-left my-4">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            {title}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {items?.map((item) => {
                return (
                  <Menu.Item key={item?._id}>
                    {({ active }) => (
                      <p
                        onClick={
                          type === "prompts"
                            ? (e) => selectOption(e)
                            : () => selectVal(item)
                        }
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900 cursor-pointer"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {item?.name}
                      </p>
                    )}
                  </Menu.Item>
                );
              })}

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 bg-white",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                    onClick={() => setOpenModal(true)}
                  >
                    {type === "templates"
                      ? "Create new template"
                      : "Create new prompt"}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default memo(Dropdown);
