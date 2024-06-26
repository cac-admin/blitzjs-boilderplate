import React, { Suspense } from "react";
import { Form, FormProps } from "../../components/Form";
import { LabeledTextField } from "../../components/LabeledTextField";

import { z } from "zod";
export { FORM_ERROR } from "../../components/Form";

export function PostForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {z
  console.log(props)
  return (
    <Form<S> {...props}>
      <LabeledTextField
        name="name"
        label="Name"
        placeholder="Name"
        type="text"
      />
      <LabeledTextField
        name="price"
        label="Price"
        placeholder="Price"
        type="number"
      />
      <LabeledTextField
        name="description"
        label="Description"
        placeholder="Description"
        type="text"
      />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  );
}
