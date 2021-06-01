import clsx from "clsx";

export function Container(props) {
  return (
    <div className="container mx-auto my-auto mt-0 max-w-7xl w-full p-1.5 sm:p-2.5">
      <div className="w-full h-full bg-transparent">
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

export function Section(props) {
  return (
    <section className="w-full flex-grow pt-1 sm:pt-2">
      <div className="w-full flex-grow">
        <h1
          className={clsx(
            props.textSize ? props.textSize : "text-2xl sm:text-3xl",
            "text-black dark:text-white font-semibold leading-loose mb-1"
          )}
        >
          {props.text}
        </h1>
        <h2
          className={clsx(
            props.subTextSize ? props.subTextSize : "text-sm sm:text-md",
            "text-gray-600 dark:text-gray-400 font-medium"
          )}
        >
          {props.subText}
        </h2>
      </div>
    </section>
  );
}
