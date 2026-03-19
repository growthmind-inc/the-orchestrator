#!/usr/bin/env npx tsx

/**
 * The Orchestrator — TypeScript Runner
 *
 * NOTE: This is a reference placeholder, not a production tool.
 * The primary way to use The Orchestrator is through the `/orchestrate`
 * Claude Code skill. This script demonstrates the cycle structure and
 * CLI argument parsing for projects that want to build their own runner.
 *
 * Usage:
 *   npx tsx scripts/orchestrator.ts
 *   npx tsx scripts/orchestrator.ts --dry-run
 *   npx tsx scripts/orchestrator.ts --max-cycles 5
 *   npx tsx scripts/orchestrator.ts --review
 */

import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

// --- CLI Argument Parsing ---

const args = process.argv.slice(2);
const maxCycles = getArgValue("--max-cycles", 10);
const dryRun = args.includes("--dry-run");
const review = args.includes("--review");

function getArgValue(flag: string, defaultValue: number): number {
  const index = args.indexOf(flag);
  if (index === -1 || index + 1 >= args.length) return defaultValue;
  return parseInt(args[index + 1], 10) || defaultValue;
}

// --- Pre-flight Checks ---

function preflight(): boolean {
  const outcomesPath = resolve("shared/OUTCOMES.md");
  if (!existsSync(outcomesPath)) {
    console.error(
      "ERROR: shared/OUTCOMES.md not found. Run `/outcomes` first."
    );
    return false;
  }

  const valuesPath = resolve(".claude/VALUES.md");
  if (!existsSync(valuesPath)) {
    console.error(
      "ERROR: .claude/VALUES.md not found. Run `/values-discovery` first."
    );
    return false;
  }

  // Check for clean git state
  try {
    const status = execSync("git status --porcelain", {
      encoding: "utf-8",
    }).trim();
    if (status) {
      console.warn("WARNING: Working tree has uncommitted changes.");
      console.warn(
        "Consider committing or stashing before running the orchestrator."
      );
    }
  } catch {
    console.error("ERROR: Not a git repository.");
    return false;
  }

  return true;
}

// --- Cycle Loop ---

async function runCycle(cycleNumber: number): Promise<"next" | "done" | "blocked"> {
  console.log(`\n--- Cycle ${cycleNumber}/${maxCycles} ---\n`);

  if (dryRun) {
    console.log("[DRY RUN] Would run PM agent to plan sprint");
    console.log("[DRY RUN] Would run CTO agent to make architecture decisions");
    console.log("[DRY RUN] Would run PL agent to execute sprint");
    return "done";
  }

  // In a real implementation, each step would invoke Claude Code:
  //
  // Step 1: PM Agent
  // execSync('claude "/prd [outcome-description]"', { stdio: "inherit" });
  //
  // Step 2: CTO Agent
  // execSync('claude "/architect [prd-path]"', { stdio: "inherit" });
  //
  // Step 3: Pre-implementation audit
  // execSync('claude "/reliability-audit [module]"', { stdio: "inherit" });
  //
  // Step 4: PL Agent
  // execSync('claude "/taskgen [prd-path] [add-path]"', { stdio: "inherit" });
  // execSync('claude "/execute [tasks-path]"', { stdio: "inherit" });
  //
  // Step 5: Post-sprint audits
  // execSync('claude "/reliability-audit [module]"', { stdio: "inherit" });
  //
  // Step 6: Create PR
  // execSync('gh pr create --title "..." --body "..."', { stdio: "inherit" });

  console.log("Cycle complete. (This is a placeholder — see comments for the real implementation.)");
  return "done";
}

// --- Main ---

async function main() {
  console.log("The Orchestrator");
  console.log(`Mode: ${dryRun ? "DRY RUN" : review ? "REVIEW" : "AUTONOMOUS"}`);
  console.log(`Max cycles: ${maxCycles}`);
  console.log();

  if (!preflight()) {
    process.exit(1);
  }

  for (let cycle = 1; cycle <= maxCycles; cycle++) {
    const result = await runCycle(cycle);

    if (result === "done") {
      console.log("\nAll outcomes complete.");
      break;
    }

    if (result === "blocked") {
      console.log("\nOrchestrator blocked. See output for details.");
      process.exit(1);
    }

    // result === "next" — continue to next cycle
  }

  console.log("\nOrchestrator finished.");
}

main().catch((err) => {
  console.error("Orchestrator error:", err);
  process.exit(1);
});
