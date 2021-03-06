import * as React from "react";

export interface FormProps<T extends {}> {
  children:
    | ((
        props: {
          data: T;
          hasChanged: boolean;
          change: (event: React.ChangeEvent<any>) => void;
          submit: (event: React.FormEvent<any>) => void;
        }
      ) => React.ReactElement<any>)
    | React.ReactNode;
  initial: T;
  onSubmit: (data?: T) => void;
}

const shallowCompare = (a: any, b: any) => {
  let ret = true;
  Object.keys(a).forEach(k => {
    if (typeof a[k] === "object") {
      if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) {
        ret = false;
      }
    } else {
      if (a[k] !== b[k]) {
        ret = false;
      }
    }
  });
  return ret;
};

class Form<T extends {} = {}> extends React.Component<FormProps<T>, T> {
  public state: T = this.props.initial;

  private handleChange = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    if (!(target.name in this.state)) {
      console.error(`Unknown form field: ${target.name}`);
      return;
    }
    this.setState(({ [target.name]: target.value } as any) as Pick<T, keyof T>);
  };

  private handleSubmit = (event: React.FormEvent<any>) => {
    const { onSubmit } = this.props;
    event.preventDefault();
    if (onSubmit !== undefined) {
      onSubmit(this.state);
    }
  };

  public render() {
    const { children } = this.props;

    let contents = children;

    if (typeof children === "function") {
      contents = children({
        change: this.handleChange,
        data: this.state,
        hasChanged: !shallowCompare(this.props.initial, this.state),
        submit: this.handleSubmit
      });
    }

    return <form onSubmit={this.handleSubmit}>{contents}</form>;
  }
}

export default Form;
