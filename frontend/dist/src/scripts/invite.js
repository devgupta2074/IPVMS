import { InviteApiRequest } from "../api/invitation.js";

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
  handleInvite();
});

async function handleInvite() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userName").value;
  console.log(name, email);
  const res = await InviteApiRequest(email, name);

  modal.style.display = "none";
}
// api call to invite team member
