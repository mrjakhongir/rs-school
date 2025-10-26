// disable scroll
export function disableScroll(): void {
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${widthScroll}px`;
}

// enable scroll
export function enableScroll(): void {
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "0";
}

const BASE_URL = "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/";

interface ErrorI {
  error: string;
}

export const fetchData = async <T>(url: string): Promise<T[]> => {
  try {
    const res = await fetch(`${BASE_URL}${url}`);
    const data = await res.json();
    return data.data;
  } catch (err: unknown) {
    const message =
      (err as ErrorI).error || "Something went wrong. Please, refresh the page";
    throw new Error(message);
  }
};
