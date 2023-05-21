import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

test("should render children and call onSubmit when form is submitted", () => {
  const onSubmitMock = jest.fn();
  const children = <input type="text" />;
  const className = "test-form";

  render(
    <Form className={className} onSubmit={onSubmitMock}>
      {children}
    </Form>
  );

  const form = screen.getByRole("form");
  expect(form).toBeInTheDocument();
  expect(form).toHaveClass(className);

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();

  fireEvent.submit(form);

  expect(onSubmitMock).toHaveBeenCalledTimes(1);
});
