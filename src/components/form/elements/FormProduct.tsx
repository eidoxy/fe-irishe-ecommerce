import { useState } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import InputIcon from "../input/InputIcon.tsx";
import TextArea from "../input/TextArea.tsx";
import Select from "../Select.tsx";
import DropzoneComponent from "../input/DropZone.tsx";

import { UserIcon } from "../../../icons/index.ts";

export default function FormProduct() {
  const [description, setDescription] = useState("");
  const options = [
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home_appliances", label: "Home Appliances" },
    { value: "books", label: "Books" },
    { value: "sports", label: "Sports" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <ComponentCard title="Default Inputs">
      <div className="space-y-6">
        <div>
          <DropzoneComponent />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <TextArea
            value={description}
            onChange={(value) => setDescription(value)}
            rows={6}
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select
            options={options}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input type="number" id="stock" />
        </div>
        <div>
          <Label htmlFor="name">Price</Label>
          <Input type="number" id="price" />
          {/* <InputIcon type="number" id="price" icon={<UserIcon/>} /> */}
        </div>
      </div>
    </ComponentCard>
  );
}
