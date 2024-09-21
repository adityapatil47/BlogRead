import path from "path";
import fs from "fs";
const filePath = path.join("./db.json");
export var json = [];
export function getPost(idx, data) {
  return idx;
}

export function rFile() {
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf8");
    json = JSON.parse(fileData);
  } else {
    json = [];
  }
}

export function wFile() {
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
  //   console.log("Data saved successfully!");
}

export function submitPost(data) {
  json.push(data);
  wFile();
}

export function editPost(idx, title, blog) {
  json[idx].title = title;
  json[idx].blog = blog;
  wFile();
}

export function deletePost(idx) {
  json.splice(idx, 1);
  wFile();
}

export function likePost(idx) {
  json[idx].isLiked = true;
  wFile();
}

export function unlikePost(idx) {
  json[idx].isLiked = false;
  wFile();
}
