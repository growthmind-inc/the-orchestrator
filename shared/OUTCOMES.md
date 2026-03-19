# Project Outcomes — TaskFlow (Example)

> Replace this file with your project's actual outcomes. Run `/outcomes` to generate interactively.

---

## O-1: User Authentication & Teams — COMPLETE

- **Status:** COMPLETE
- **Priority:** P0
- **north_star:** Users can sign up, create teams, and invite members — the foundation for all collaborative features.

### Requirements
1. Email/password authentication with email verification
2. Team creation with invite-by-email
3. Role-based access (admin, member, viewer)

### Success Criteria
- [x] Users can sign up and log in
- [x] Teams can be created and members invited
- [x] Roles enforce correct permissions

---

## O-2: Task Board with Real-Time Updates — IN PROGRESS

- **Status:** IN PROGRESS
- **Priority:** P0
- **Estimated effort:** Medium (3-4 sprints)
- **ui_heavy:** true
- **north_star:** Team members see task changes in real time without refreshing — reducing coordination overhead by 50%.

### Requirements
1. Kanban board with drag-and-drop
2. Real-time updates via WebSocket
3. Task assignment, due dates, labels
4. Activity feed per task

### Success Criteria
- [ ] Board renders with columns (To Do, In Progress, Done)
- [ ] Drag-and-drop updates task status
- [ ] Changes appear for all team members within 2 seconds
- [ ] Activity feed shows who changed what and when

---

## O-3: Notification System — NOT STARTED

- **Status:** NOT STARTED
- **Priority:** P1
- **Estimated effort:** Small (1-2 sprints)
- **ui_heavy:** false
- **north_star:** Team members never miss important task updates — reducing "I didn't know" moments to zero.

### Requirements
1. In-app notification bell with unread count
2. Email digest (daily summary)
3. Configurable notification preferences per user

### Success Criteria
- [ ] Users receive in-app notifications for task assignments and mentions
- [ ] Daily email digest sent for users who opt in
- [ ] Notification preferences page allows per-event-type control
