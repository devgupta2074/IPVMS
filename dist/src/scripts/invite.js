import { document } from "postcss";
import { InviteApiRequest } from "../api/invitation";
const inviteButton = document.getElementById("inviteButton");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("closeButton");
const inviteSubmit = document.getElementById("inviteSubmit");

inviteButton.addEventListener("click", function () {
  modal.style.display = "block";
});

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
});
document.getElementById("inviteSubmit").addEventListener("click", function () {
  // handleInvite();
});

async function handleInvite() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  console.log(name, email);
  // const res = await InviteApiRequest(email, name);
  if (res.statusCode === 409) {
    document.getElementById("emailerror").classList.remove("hidden");
  }
  modal.style.display = "none";
}
// api call to invite team member
