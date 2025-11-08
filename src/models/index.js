import User from "./users.js";
import Project from "./projects.js";
import Task from "./tasks.js";
import Comment from "./comments.js";
import Notification from "./notification.js";
import ProjectMember from "./projectMember.js";

// Relationships
User.hasMany(Project, { foreignKey: "created_by" });
Project.belongsTo(User, { as: "creator", foreignKey: "created_by" });

User.hasMany(Task, { foreignKey: "assigned_to" });
Task.belongsTo(User, { as: "assignee", foreignKey: "assigned_to" });

Project.hasMany(Task, { foreignKey: "project_id" });
Task.belongsTo(Project, { foreignKey: "project_id" });

Task.hasMany(Comment, { foreignKey: "task_id" });
Comment.belongsTo(Task, { foreignKey: "task_id" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

Project.belongsToMany(User, { through: ProjectMember, foreignKey: "project_id" });
User.belongsToMany(Project, { through: ProjectMember, foreignKey: "user_id" });

export {
  User,
  Project,
  Task,
  Comment,
  Notification,
  ProjectMember,
};
