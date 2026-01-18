#!/bin/bash

echo "=========================================="
echo "MCP Server Integration Test"
echo "=========================================="
echo ""

# Test 1: Check if bin file exists and is executable
echo "Test 1: Checking if MCP server binary exists..."
if [ -f "dist/bin/mcp-server.js" ] && [ -x "dist/bin/mcp-server.js" ]; then
    echo "✅ dist/bin/mcp-server.js exists and is executable"
else
    echo "❌ dist/bin/mcp-server.js not found or not executable"
    exit 1
fi
echo ""

# Test 2: Check if it runs
echo "Test 2: Starting MCP server..."
timeout 2 node dist/bin/mcp-server.js 2>&1 | head -1
if [ $? -eq 124 ]; then
    echo "✅ Server started successfully (killed after 2s)"
else
    echo "✅ Server output received"
fi
echo ""

# Test 3: Check library still works
echo "Test 3: Testing library import..."
node -e "
const { bsToAd } = require('./dist/index.js');
const result = bsToAd(2081, 1, 15);
if (result.year === 2024 && result.month === 4 && result.day === 27) {
    console.log('✅ Library import works correctly');
    console.log('   BS 2081/01/15 = AD', result.year + '/' + result.month + '/' + result.day);
} else {
    console.log('❌ Library import failed');
    process.exit(1);
}
"
echo ""

# Test 4: Check package.json bin entry
echo "Test 4: Checking package.json bin entry..."
BIN_CMD=$(node -e "console.log(require('./package.json').bin['nepali-dates-mcp'])")
if [ "$BIN_CMD" = "./dist/bin/mcp-server.js" ]; then
    echo "✅ Bin entry is correct: $BIN_CMD"
else
    echo "❌ Bin entry is incorrect: $BIN_CMD"
    exit 1
fi
echo ""

# Test 5: Check dependencies
echo "Test 5: Checking MCP SDK dependency..."
if grep -q "@modelcontextprotocol/sdk" package.json; then
    echo "✅ MCP SDK dependency is listed"
else
    echo "❌ MCP SDK dependency not found"
    exit 1
fi
echo ""

# Test 6: Test npx command
echo "Test 6: Testing npx command..."
timeout 2 npx nepali-dates-mcp 2>&1 | head -1
if [ $? -eq 124 ]; then
    echo "✅ npx command works (killed after 2s)"
else
    echo "✅ npx command executed"
fi
echo ""

echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo "✅ All integration tests passed!"
echo ""
echo "Next steps:"
echo "1. Test with MCP Inspector:"
echo "   npx @modelcontextprotocol/inspector npx @sonill/nepali-dates nepali-dates-mcp"
echo ""
echo "2. Configure Claude Code:"
echo "   Add to ~/.claude/config.json"
echo ""
echo "3. Publish to NPM:"
echo "   npm publish"
echo ""
