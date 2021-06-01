import clsx from "clsx";

export function Container(props) {
  return (
    <div className="container mx-auto my-auto mt-0 max-w-screen p-3">
      <div className="w-full h-full bg-transparent flex flex-wrap place-content-center place-items-center">
        {props.children}
      </div>
    </div>
  );
}

export function Paper(props) {
  return (
    <div className="card lg:card-side bordered">
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export function Box(props) {
  return <div className="w-full flex-grow pt-1 mx-auto">{props.children}</div>;
}

export function Typography(props) {
  return <p className={clsx(props.variant)}>{props.children}</p>;
}

export function Button(props) {
  return <button className="btn">{props.children}</button>;
}
