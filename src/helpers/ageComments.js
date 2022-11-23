import {
  departments,
  ultramarins,
  oldestMan,
  oldestWoman,
} from "./ageCommentsData";

export default function ageComments(age, gender, genderConfirmation) {
  let funfacts = "Nothing much to say about your age";

  if (age === "") {
    funfacts = `Are you so old that you forgot to type your age in?`;
  } else if (Number(age) === 0) {
    funfacts = `You're so young!`;
  } else if (Number(age) <= 95) {
    funfacts =
      `Converted into a French department, your age is` +
      ` ${departments[Number(age)]}`;
  } else if (Number(age) > 95 && Number(age) < 100) {
    funfacts = "Almost a century! See you next year!";
  } else if (Number(age) === 100) {
    funfacts = "Congratulations! Next step, your 200th birthday!";
  } else if (Number(age) === 110) {
    funfacts = "Impressive! You are a supercentenarian!";
  } else if (Number(age) > 100 && Number(age) <= Number(oldestWoman.age)) {
    if (genderConfirmation === "non-binary") {
      funfacts = (
        <span>
          Did you know that
          <br /> the oldest man,{" "}
          <a href={oldestMan.url} target="_blank">
            {oldestMan.firstName} {oldestMan.lastName}
          </a>{" "}
          , lived {oldestMan.age} years,
          <br /> while the oldest woman,{" "}
          <a href={oldestWoman.url} target="_blank">
            {oldestWoman.firstName} {oldestWoman.lastName}
          </a>
          , lived {oldestWoman.age} years
        </span>
      );
    } else if (gender === "male" && Number(age) <= Number(oldestMan.age)) {
      funfacts = (
        <span>
          You are not older than{" "}
          <a href={oldestMan.url} target="_blank">
            {oldestMan.firstName} {oldestMan.lastName}
          </a>
        </span>
      );
    } else if (gender === "female") {
      funfacts = (
        <span>
          You are not older than{" "}
          <a href={oldestWoman.url} target="_blank">
            {oldestWoman.firstName} {oldestWoman.lastName}
          </a>
        </span>
      );
    } else {
      funfacts = (
        <span>
          Not bad! <br /> You'll do better next year!
        </span>
      );
    }
  } else if (ultramarins[age]) {
    funfacts =
      `Converted into an overseas France territory, your age is ` +
      `${ultramarins[String(age)]}`;
  } else if (Number(age) >= 1000) {
    funfacts = "Now, I'm pretty sure you are a vampire!";
  } else if (Number(age) > Number(oldestWoman.age)) {
    funfacts = "Wait! Are you a vampire?";
  }

  return <div>{funfacts}</div>;
}
