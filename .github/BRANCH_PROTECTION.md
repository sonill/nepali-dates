# Branch Protection Rules

To automatically reject pull requests when tests fail, you need to configure branch protection rules on GitHub.

## Setup Instructions

1. Go to your GitHub repository
2. Click on **Settings** → **Branches**
3. Under "Branch protection rules", click **Add rule**
4. Configure the following settings:

### Branch Name Pattern
```
main
```

### Required Settings

✅ **Require a pull request before merging**
- Require approvals: 1 (optional, but recommended)
- Dismiss stale pull request approvals when new commits are pushed

✅ **Require status checks to pass before merging**
- Require branches to be up to date before merging
- Status checks that are required:
  - `test (16.x)` - Tests on Node.js 16
  - `test (18.x)` - Tests on Node.js 18
  - `test (20.x)` - Tests on Node.js 20
  - `checks` - PR checks workflow
  - `coverage` - Coverage report

✅ **Require conversation resolution before merging**
- All conversations must be resolved before merging

✅ **Do not allow bypassing the above settings**
- Enforce for administrators (recommended)

### Optional but Recommended

✅ **Require linear history**
- Prevent merge commits, require rebase or squash

✅ **Require deployments to succeed before merging**
- (If you have deployment workflows)

## How It Works

Once configured:

1. **Pull Request Created** → Workflows automatically run
2. **Tests Run** → On Node.js 16, 18, and 20
3. **Linting Checks** → TypeScript compilation and linting
4. **Data Validation** → Ensures calendar data integrity
5. **Build Check** → Verifies the package builds successfully

### When Tests Fail

- ❌ The PR will show **"Some checks were not successful"**
- ❌ The "Merge" button will be **disabled**
- ❌ A red X appears next to failed checks
- 📝 Bot comments on the PR with failure details

### When Tests Pass

- ✅ The PR will show **"All checks have passed"**
- ✅ The "Merge" button will be **enabled**
- ✅ Green checkmarks appear next to all checks
- 📝 Bot comments on the PR confirming success

## Testing the Setup

Create a test branch and PR to verify:

```bash
git checkout -b test-ci
echo "test" >> README.md
git add README.md
git commit -m "test: CI configuration"
git push origin test-ci
```

Then create a PR and watch the workflows run!

## Troubleshooting

### Workflows not running?
- Check that workflow files are in `.github/workflows/`
- Ensure workflows are committed to the main branch
- Verify Actions are enabled in repository settings

### Status checks not appearing?
- Wait for workflows to run at least once
- Status checks only appear after first workflow run
- Refresh the branch protection rules page

### Need to merge urgently?
- Temporarily disable branch protection (not recommended)
- Or fix the failing tests first (strongly recommended)

## Additional Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
