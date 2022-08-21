import ageComments from "./ageComments";

import {
  oldestMan,
  oldestWoman,
} from "./ageCommentsData";

test("Should work with nothing", () => {
  expect(ageComments("")).toStrictEqual(
    <div>Are you so old that you forgot to type in your age?</div>
  );
});

test("Should work with 0 years", () => {
  expect(ageComments(0)).toStrictEqual(<div>You're so young!</div>);
});

test("Should work with 15 years", () => {
  expect(ageComments(15)).toStrictEqual(
    <div>Converted into a French department, your age is le Cantal</div>
  );
});

test("Should work with 98 years", () => {
  expect(ageComments(98)).toStrictEqual(
    <div>Almost a century! See you next year!</div>
  );
});

test("Should work with 100 years", () => {
  expect(ageComments(100)).toStrictEqual(
    <div>Congratulations! Next step, your 200th birthday!</div>
  );
});

test("Should work with 110 years", () => {
  expect(ageComments(110)).toStrictEqual(
    <div>Impressive! You are a supercentenarian!</div>
  );
});

test("Should work with 115 years and non-binary", () => {
  const age = 115;
  const gender = "";
  const genderConfirmation = "non-binary";
  expect(ageComments(age, gender, genderConfirmation)).toStrictEqual(
    <div>
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
    </div>
  );
});

test("Should work with 115 years and male", () => {
  const age = 115;
  const gender = "male";
  const genderConfirmation = "";
  expect(ageComments(age, gender, genderConfirmation)).toStrictEqual(
    <div>
      <span>
        You are not older than{" "}
        <a href={oldestMan.url} target="_blank">
          {oldestMan.firstName} {oldestMan.lastName}
        </a>
      </span>
    </div>
  );
});

test("Should not work with 116 years, male and non-binary", () => {
  const age = 116;
  const gender = "male";
  const genderConfirmation = "non-binary";
  expect(ageComments(age, gender, genderConfirmation)).not.toStrictEqual(
    <div>
      <span>
        You are not older than{" "}
        <a href={oldestMan.url} target="_blank">
          {oldestMan.firstName} {oldestMan.lastName}
        </a>
      </span>
    </div>
  );
});

test("Should work with 116 years, female", () => {
  const age = 116;
  const gender = "female";
  const genderConfirmation = "";
  expect(ageComments(age, gender, genderConfirmation)).toStrictEqual(
    <div>
      <span>
        You are not older than{" "}
        <a href={oldestWoman.url} target="_blank">
          {oldestWoman.firstName} {oldestWoman.lastName}
        </a>
      </span>
    </div>
  );
});

test("Should not work with 116 years, female and non-binary", () => {
  const age = 116;
  const gender = "female";
  const genderConfirmation = "non-binary";
  expect(ageComments(age, gender, genderConfirmation)).not.toStrictEqual(
    <div>
      <span>
        You are not older than{" "}
        <a href={oldestWoman.url} target="_blank">
          {oldestWoman.firstName} {oldestWoman.lastName}
        </a>
      </span>
    </div>
  );
});

test("Should work with 116 years, but no gender or confirmation provided", () => {
  const age = 116;
  const gender = "";
  const genderConfirmation = "";
  expect(ageComments(age, gender, genderConfirmation)).toStrictEqual(
    <div>
      <span>
        Not bad! <br /> You'll do better next year!
      </span>
    </div>
  );
});

test("Should work with 988 years", () => {
  expect(ageComments(988)).toStrictEqual(
    <div>
      Converted into an overseas France territory, your age is la
      Nouvelle-Calédonie
    </div>
  );
});

test("Should work between 123 up to 1000 years", () => {
  expect(ageComments(123, "female")).toStrictEqual(
    <div>Wait! Are you a vampire?</div>
  );
  expect(ageComments(500, "male")).toStrictEqual(
    <div>Wait! Are you a vampire?</div>
  );
  expect(ageComments(999)).toStrictEqual(<div>Wait! Are you a vampire?</div>);
});

test("Should work above 1000 years", () => {
  expect(ageComments(1001)).toStrictEqual(
    <div>Now, I'm pretty sure you are a vampire!</div>
  );
});
