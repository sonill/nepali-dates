# Continuous Integration Setup Guide

This guide will help you set up automated testing and PR checks for the Nepali Dates repository.

## What's Been Set Up

### 1. GitHub Actions Workflows

Three workflows have been created in `.github/workflows/`:

#### `test.yml` - Main Test Workflow
- **Triggers:** On every push to `main` and on all pull requests
- **What it does:**
  - Tests on Node.js versions 16, 18, and 20
  - Runs linting (`npm run lint`)
  - Runs all tests (`npm test`)
  - Builds the package (`npm run build`)
  - Validates calendar data (`npm run validate-data`)
  - Generates coverage report and uploads to Codecov

#### `pr-checks.yml` - Pull Request Checks
- **Triggers:** When PRs are opened, updated, or reopened
- **What it does:**
  - Runs comprehensive checks
  - Posts a comment on the PR with results
  - Updates the comment on subsequent pushes
  - Shows bundle size information

#### `stale.yml` - Stale Issue/PR Management
- **Triggers:** Daily at midnight
- **What it does:**
  - Marks issues stale after 60 days of inactivity
  - Marks PRs stale after 30 days of inactivity
  - Closes stale items after 14 additional days
  - Exempts important labels and milestones

### 2. Additional Files

- **CODEOWNERS**: Auto-assigns you as reviewer on all PRs
- **PULL_REQUEST_TEMPLATE.md**: Provides a template for contributors
- **BRANCH_PROTECTION.md**: Instructions for setting up branch protection

## Quick Setup Steps

### Step 1: Push These Files to GitHub

```bash
git add .github/
git commit -m "ci: add GitHub Actions workflows and templates"
git push origin main
```

### Step 2: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. If prompted, click **"I understand my workflows, go ahead and enable them"**

### Step 3: Configure Branch Protection Rules

Follow the instructions in [BRANCH_PROTECTION.md](.github/BRANCH_PROTECTION.md)

**Quick steps:**
1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Branch name pattern: `main`
4. Enable these options:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
     - Select: `test (16.x)`, `test (18.x)`, `test (20.x)`, `checks`, `coverage`
   - ✅ Require conversation resolution before merging
5. Click **Create** or **Save changes**

### Step 4: Test the Setup

Create a test PR to verify everything works:

```bash
# Create a test branch
git checkout -b test-ci-setup

# Make a small change
echo "# CI Test" >> .github/CI_SETUP.md

# Commit and push
git add .
git commit -m "test: verify CI setup"
git push origin test-ci-setup
```

Then:
1. Go to GitHub and create a PR from `test-ci-setup` to `main`
2. Watch the workflows run
3. Verify all checks pass
4. Close/delete the test PR

## How It Works

### For Pull Requests

1. **Someone creates a PR** → Workflows automatically trigger
2. **Tests run** on multiple Node.js versions
3. **If tests pass:**
   - ✅ Green checkmarks appear
   - 📝 Bot comments with success message
   - ✅ "Merge" button is enabled
4. **If tests fail:**
   - ❌ Red X marks appear
   - 📝 Bot comments with failure details
   - 🚫 "Merge" button is disabled

### For Direct Pushes to Main

- Tests still run but don't block (you're the owner)
- You'll get notifications if tests fail
- Recommended: Use PRs even for your own changes

## Monitoring

### View Workflow Runs

1. Go to the **Actions** tab in your repository
2. See all workflow runs, their status, and logs
3. Click on any run to see detailed logs

### CI Badge

The README now includes a CI badge that shows the current test status:

```markdown
[![Tests](https://github.com/sonill/nepali-dates/actions/workflows/test.yml/badge.svg)](https://github.com/sonill/nepali-dates/actions/workflows/test.yml)
```

## Troubleshooting

### Workflows Not Running?

**Check:**
- Are GitHub Actions enabled? (Settings → Actions)
- Are workflows in the `.github/workflows/` directory?
- Did you push the workflow files to the main branch?

### Tests Failing on CI but Passing Locally?

**Common causes:**
- Node.js version differences
- Missing dependencies in package-lock.json
- Environment-specific issues

**Solutions:**
```bash
# Run tests with the same Node version as CI
nvm use 20
npm ci  # Use ci instead of install
npm test
```

### Branch Protection Not Working?

**Check:**
- Did you select the correct status checks?
- Are the status check names exactly matching?
- Did workflows run at least once? (Status checks only appear after first run)

### Need to Bypass Checks?

**Not recommended, but if urgent:**
1. Temporarily disable branch protection
2. Merge the PR
3. Re-enable branch protection
4. Fix the issues in a follow-up PR

**Better approach:**
- Fix the failing tests
- Push the fixes
- Wait for checks to pass

## Customization

### Add More Status Checks

Edit `.github/workflows/test.yml`:

```yaml
- name: Your custom check
  run: npm run your-script
```

### Change Node.js Versions

Edit the matrix in `.github/workflows/test.yml`:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Update versions
```

### Modify Stale Timeframes

Edit `.github/workflows/stale.yml`:

```yaml
days-before-pr-stale: 45  # Change from 30
days-before-pr-close: 7   # Change from 14
```

## Best Practices

1. **Always use PRs** - Even for small changes
2. **Keep tests fast** - Long-running tests slow down development
3. **Fix failing tests immediately** - Don't let them accumulate
4. **Review CI logs** - They often contain useful debugging info
5. **Update workflows** - As the project grows, update CI accordingly

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [CODEOWNERS File](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

## Questions?

If you encounter issues:
1. Check the workflow logs in the Actions tab
2. Review this guide
3. Check GitHub Actions documentation
4. Open an issue in the repository

---

**Status:** ✅ CI is now configured and ready to use!
