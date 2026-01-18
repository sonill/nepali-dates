# GitHub Actions Workflows

This directory contains automated workflows for the Nepali Dates project.

## Workflows Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
         ┌──────▼──────┐ ┌───▼────┐ ┌─────▼──────┐
         │  Pull       │ │ Push   │ │  Daily     │
         │  Request    │ │ to     │ │  Schedule  │
         │  Events     │ │ main   │ │            │
         └──────┬──────┘ └───┬────┘ └─────┬──────┘
                │            │             │
    ┌───────────┼────────────┼─────────────┤
    │           │            │             │
┌───▼───┐  ┌───▼────┐  ┌────▼────┐  ┌────▼────┐
│ Tests │  │ PR     │  │ Tests   │  │ Stale   │
│       │  │ Checks │  │         │  │ Cleanup │
└───┬───┘  └───┬────┘  └────┬────┘  └────┬────┘
    │          │            │             │
    │      ┌───▼──────┐     │             │
    │      │ Comment  │     │             │
    │      │ on PR    │     │             │
    │      └──────────┘     │             │
    │                       │             │
┌───▼───────────────────────▼──┐    ┌────▼─────┐
│  Status Check Results        │    │  Label   │
│  ✅ Pass → Enable Merge      │    │  & Close │
│  ❌ Fail → Block Merge       │    │  Stale   │
└──────────────────────────────┘    └──────────┘
```

## Workflows

### 1. `test.yml` - Continuous Integration Tests

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**Jobs:**
- **test**: Runs on Node.js 16, 18, and 20
  - Checkout code
  - Install dependencies
  - Run linter
  - Run tests
  - Build package
  - Validate data

- **coverage**: Runs after tests pass
  - Generate coverage report
  - Upload to Codecov

**Status:** Required for merging PRs

---

### 2. `pr-checks.yml` - Pull Request Automation

**Triggers:**
- PR opened
- PR synchronized (new commits)
- PR reopened

**Jobs:**
- **checks**: Comprehensive validation
  - TypeScript compilation
  - All tests
  - Data validation
  - Bundle size check
  - Comment PR with results

**Status:** Required for merging PRs

---

### 3. `stale.yml` - Housekeeping

**Triggers:**
- Daily at midnight (UTC)

**Jobs:**
- **stale**: Clean up inactive items
  - Mark stale issues (60+ days)
  - Mark stale PRs (30+ days)
  - Close after 14 more days
  - Exempt important labels

**Status:** Informational only

---

## Workflow Files

| File | Lines | Purpose |
|------|-------|---------|
| `test.yml` | ~55 | Main CI pipeline |
| `pr-checks.yml` | ~60 | PR automation |
| `stale.yml` | ~45 | Cleanup |

## Required Status Checks

To enable automatic rejection of failed PRs, configure these status checks in branch protection:

- `test (16.x)` - Tests on Node 16
- `test (18.x)` - Tests on Node 18
- `test (20.x)` - Tests on Node 20
- `checks` - PR checks workflow
- `coverage` - Coverage report

## Viewing Workflow Runs

1. Go to the **Actions** tab in GitHub
2. Select a workflow from the sidebar
3. View runs, status, and detailed logs
4. Download artifacts (if any)

## Local Testing

Test workflows locally before pushing:

```bash
# Install act (GitHub Actions local runner)
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run workflows locally
act pull_request  # Test PR workflows
act push          # Test push workflows
```

## Debugging Failed Workflows

### View Logs
1. Click on the failed workflow run
2. Click on the failed job
3. Expand the failed step
4. Review error messages

### Common Issues

**npm ci fails:**
```bash
# Solution: Update package-lock.json
npm install
git add package-lock.json
git commit -m "chore: update package-lock.json"
```

**TypeScript errors:**
```bash
# Solution: Fix type errors
npm run lint
# Fix the reported errors
```

**Tests fail:**
```bash
# Solution: Fix failing tests
npm test
# Debug and fix failing tests
```

## Updating Workflows

When modifying workflows:

1. Edit the `.yml` file
2. Commit the changes
3. Push to a test branch
4. Create a PR to verify changes work
5. Merge to main once verified

## Security

**Secrets:**
- GitHub automatically provides `GITHUB_TOKEN`
- No manual secrets configuration needed
- Token has repository-scoped permissions

**Permissions:**
- Workflows have minimal required permissions
- Defined explicitly in each workflow
- Can't access repository secrets by default

## Performance

**Average Run Times:**
- Tests workflow: ~2-3 minutes
- PR checks: ~2-3 minutes
- Stale cleanup: ~30 seconds

**Optimization:**
- Cache npm dependencies
- Run jobs in parallel where possible
- Skip unnecessary steps based on file changes

## Notifications

You'll receive notifications for:
- ✅ Workflow success (optional)
- ❌ Workflow failures (always)
- 📝 PR comments from bot (in-app)

Configure in: Settings → Notifications

## Resources

- [GitHub Actions Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)
- [Workflow Examples](https://github.com/actions/starter-workflows)

---

**Last Updated:** 2026-01-18
