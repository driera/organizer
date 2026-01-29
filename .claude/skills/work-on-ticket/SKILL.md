---
name: work-on-ticket
description: Identifies and manages work on tickets from README.md. Handles ticket selection, status updates, session documentation, and planning. Use when user wants to start working on a task, continue existing work, or asks "what should I work on?"
user-invocable: true
model: sonnet
---

# Work on Ticket

This skill helps you identify, select, and prepare work on tasks from the README.md backlog. It manages ticket status, creates session documentation, and sets up planning mode.

## Execution Flow

### Step 1: Read Current State

Read the following files to understand current work:
- `README.md` - to identify available tickets
- `sessions/` directory (use Glob to find all session files)

### Step 2: Identify Current Work Status

**If there are ticket(s) tagged [DOING]:**

1. List all [DOING] tickets to the user
2. For each [DOING] ticket, find and read the corresponding session file from `sessions/` directory:
   - Session files are named: `YYMMDD-ticket-name.md`
   - Match by ticket name/description
3. For each [DOING] ticket, summarize:
   - **What has been completed**: Look for ✓ checkmarks, completed steps, "Complete" status
   - **What remains to be done**: Look for unchecked items, pending steps, "Pending" status
   - **Any blockers or issues**: Check "Issues/Blockers" section
4. Present to user:
   ```
   Found ticket(s) in progress:

   [DOING] <ticket description>
   Progress: <summary of completed vs remaining>
   Next steps: <what needs to be done next>

   Would you like to continue with this ticket, or work on a different one?
   ```

**If user says continue:**
- Skip to Step 4 (no README update needed)
- Resume from the existing session file
- Identify next uncompleted steps

**If user says work on a different ticket:**
- Leave the current [DOING] ticket as-is (don't change its tag)
- Proceed to Step 3 to suggest a new ticket

**If there are multiple [DOING] tickets:**
- List ALL [DOING] tickets with their progress summaries
- Ask user: "Which ticket would you like to continue with? Or would you prefer to work on a different ticket?"

**If there are NO [DOING] tickets:**
- Proceed to Step 3 to suggest a new ticket

### Step 3: Suggest New Ticket

Look for tickets in README.md in this priority order:
1. First ticket tagged `[TODO]`
2. First ticket with no tag

Present the ticket to the user:
```
Found ticket: <ticket description>

Would you like to work on this?
Options: yes / no / suggest another
```

**If user says "no" or "suggest another":**
- Move to the next available ticket in the list
- Present it the same way
- Repeat until user accepts or no tickets remain

**If user specifies a different ticket by name/number:**
- Use that specific ticket instead
- Proceed to Step 4

**If user accepts the suggested ticket:**
- Proceed to Step 4

**If no tickets are available:**
- Inform user: "No tickets found in README.md. Please add tasks to work on."
- Exit the skill

### Step 4: Update README.md (for NEW tickets only)

**Only when starting work on a NEW ticket** (not when continuing existing [DOING]):

1. Find the accepted ticket line in README.md
2. Change its tag:
   - From `[TODO]` or no-tag → `[DOING]`
3. Do NOT change any other [DOING] tickets (leave them as-is)

**For CONTINUING existing [DOING] tickets:**
- Skip this step entirely (no README changes)

### Step 5: Enter Planning Mode

Use the `EnterPlanMode` tool to begin planning the implementation.

**During planning, you should:**

1. **Explore the codebase:**
   - Use Glob to find relevant files
   - Use Grep to search for related code
   - Use Read to understand current implementation
   - Identify files that will need modification

2. **Design the approach:**
   - Identify different possible approaches
   - Consider trade-offs of each approach
   - Think about architecture and patterns
   - Identify which parts of the codebase are involved

3. **Identify challenges:**
   - What are the risks?
   - What could go wrong?
   - What are the edge cases?
   - What are the technical challenges?
   - What dependencies exist?

4. **Ask clarifying questions:**
   - Use `AskUserQuestion` if you need to choose between approaches
   - Clarify requirements if anything is ambiguous
   - Get user input on architectural decisions

**IMPORTANT - What NOT to do during planning:**
- Do NOT write specific code implementations
- Do NOT define exact solutions
- Do NOT write tests yet
- Focus on WHAT needs to be achieved, not HOW to code it

**Planning should produce:**
- High-level goals
- Steps required (but not code-level details)
- Files that need changes (but not exact changes)
- Risks and considerations
- Technical approach (but not implementation)

### Step 6: Create Session File

**AFTER exiting plan mode** (when user approves the plan):

Create a new session file at: `sessions/YYMMDD-ticket-name.md`

Where:
- `YYMMDD` = today's date in format YYMMDD (e.g., 260129 for January 29, 2026)
- `ticket-name` = brief slug from the ticket description (lowercase, words separated by hyphens, keep it short)

**Example naming:**
- "Add edit feature" → `260129-edit-feature.md`
- "Increase due date options" → `260129-due-date-options.md`
- "Switch to unstyled components" → `260129-unstyled-components.md`

**Session File Structure:**

```markdown
# Session: <Ticket Title>

**Date:** YYYY-MM-DD

## Goals

<High-level goals for this ticket - what we want to accomplish>
- Goal 1
- Goal 2
- Goal 3

---

## Implementation Plan

### Overview
<Brief summary of the overall approach - 2-3 sentences>

### Steps Index

1. **<Step Name>** - Status: ⏳ Pending
2. **<Step Name>** - Status: ⏳ Pending
3. **<Step Name>** - Status: ⏳ Pending
4. **<Step Name>** - Status: ⏳ Pending

*Status indicators: ⏳ Pending | 🔄 In Progress | ✅ Complete*

---

## Detailed Steps

### Step 1: <Step Name>

**Goal:** <What this step achieves - specific objective>

**Files to modify:**
- \`path/to/file1.ts\` - <what needs to change>
- \`path/to/file2.ts\` - <what needs to change>

**Approach:**
<Describe the approach at a high level - WHAT needs to happen, not the specific code>

**Risks & Considerations:**
- <Risk 1 and how to mitigate>
- <Risk 2 and how to mitigate>
- <Edge case to handle>

**Acceptance Criteria:**
- [ ] <Criterion 1>
- [ ] <Criterion 2>
- [ ] <Criterion 3>

---

### Step 2: <Step Name>

**Goal:** <What this step achieves>

**Files to modify:**
- \`path/to/file.ts\` - <what needs to change>

**Approach:**
<High-level approach description>

**Risks & Considerations:**
- <Risks, edge cases, technical challenges>

**Acceptance Criteria:**
- [ ] <Criterion 1>
- [ ] <Criterion 2>

---

<Continue for all steps...>

---

## Technical Considerations

### Architecture Decisions
<Key decisions about approach, patterns, libraries, etc.>

**Decision 1: <Decision Name>**
- **Options considered:** <List alternatives>
- **Chosen approach:** <What was chosen>
- **Rationale:** <Why this approach>

### Risks & Challenges
- **<Risk 1>:** <Description and mitigation strategy>
- **<Risk 2>:** <Description and mitigation strategy>

### Edge Cases to Handle
- <Edge case 1>
- <Edge case 2>
- <Edge case 3>

### Dependencies
- <Any external dependencies, prerequisites, or blockers>

---

## Progress

<Leave empty initially - will be filled during implementation>

---

## Issues/Blockers

<Leave empty initially - will be filled if issues arise during implementation>

---

## Summary

<Leave empty initially - will be filled when work is complete>

---
```

**After creating the session file:**

Use the Write tool to create the file with the content generated from your planning.

### Step 7: Confirm Next Steps

After creating the session file, inform the user:

```
✅ Session file created: sessions/YYMMDD-ticket-name.md
✅ README.md updated: Ticket marked as [DOING]

📋 Implementation plan is ready. The session file contains:
   - <Number> steps to complete
   - Files to modify: <list key files>
   - Key risks identified: <mention 1-2 main risks>

🚀 Ready to begin implementation.

Next action: Start with Step 1: <first step name>

Would you like me to proceed with implementation?
```

## Guidelines for Session File Creation

### Level of Detail

**Goals section:**
- High-level objectives
- What success looks like
- User-facing outcomes

**Steps Index:**
- Keep it concise (just step names and status)
- Should fit on one screen
- Easy to scan progress

**Detailed Steps:**
- Focus on WHAT needs to be achieved, not HOW to code it
- Describe goals, not implementations
- Include files involved
- Identify risks and edge cases
- Provide acceptance criteria (testable outcomes)

**DO:**
- "Update the useNotes hook to support editing notes"
- "Add a callback function that finds and updates a note by index"
- "Consider: What if the index is out of bounds?"

**DON'T:**
- "Add this code: `const updateNote = (index, newText) => { ... }`"
- "Use Array.prototype.map to create a new array"
- "Add a try-catch block around the update logic"

### Thinking About Risks

For each step, consider:
- **Technical risks:** What could break? What's fragile?
- **Edge cases:** What unusual inputs/states need handling?
- **Dependencies:** What must happen first? What could block this?
- **Complexity:** What's harder than it seems?
- **User impact:** How could this affect users if it goes wrong?

### Acceptance Criteria

Make them:
- **Testable:** Can you verify this is done?
- **Specific:** Clear what "done" means
- **User-focused:** Often relates to user-visible behavior
- **Complete:** Covers main cases and edge cases

Examples:
- [ ] User can click edit button on any note
- [ ] Edited text persists after page refresh
- [ ] Empty text input is prevented
- [ ] All existing tests still pass
- [ ] New tests cover edit functionality

## Resuming Existing Work

When continuing a [DOING] ticket with an existing session file:

1. **Read the session file completely**
2. **Identify what's done:**
   - Look for ✅ Complete status
   - Look for checked [ ] items
   - Read the Progress section
3. **Identify what's remaining:**
   - Look for ⏳ Pending or 🔄 In Progress status
   - Look for unchecked [ ] items
   - Find the next step that needs work
4. **Check for blockers:**
   - Read Issues/Blockers section
   - See if anything is preventing progress
5. **Summarize for the user:**
   ```
   Resuming work on: <ticket name>

   ✅ Completed:
   - Step 1: <name>
   - Step 2: <name>

   ⏳ Remaining:
   - Step 3: <name> (next)
   - Step 4: <name>

   Next action: <what needs to be done next>

   Ready to continue?
   ```

## Error Handling

**If README.md is not found:**
```
❌ README.md not found. This skill requires a README.md file with tasks.
   Please create README.md with your task list.
```

**If no tickets are available:**
```
ℹ️  No tickets found in README.md.
   Please add tasks to your backlog. Example:

   TASKS
   - [TODO] Add user authentication
   - [TODO] Improve error handling
   - Fix performance issues
```

**If session file already exists for the same ticket/date:**
- Ask user:
  ```
  A session file already exists: sessions/YYMMDD-ticket-name.md

  Options:
  1. Continue with existing plan (recommended)
  2. Create new plan (will archive the old one)
  3. Cancel

  What would you like to do?
  ```

**If multiple session files match the [DOING] ticket:**
- Use the most recent one (by date in filename)
- Inform user: "Using most recent session file: sessions/YYMMDD-ticket-name.md"

## Tips for Effective Planning

1. **Start broad, then go deep:**
   - First understand the overall goal
   - Then break into steps
   - Then detail each step

2. **Think about order:**
   - What must happen first?
   - What can happen in parallel?
   - What depends on what?

3. **Consider testability:**
   - How will we know it works?
   - What tests are needed?
   - What can we test at each step?

4. **Think about rollback:**
   - What if this doesn't work?
   - Can we undo changes easily?
   - Are there breaking changes?

5. **Ask questions:**
   - Use AskUserQuestion during planning
   - Clarify ambiguities early
   - Get user input on trade-offs

## Model Configuration

This skill uses `model: sonnet` (configured in frontmatter) to ensure high-quality strategic thinking during planning and session file creation.
