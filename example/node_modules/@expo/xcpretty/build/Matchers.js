"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matchers = void 0;
exports.Matchers = {
    /**
     * @regex Captured groups
     * `$1` filePath
     * `$2` fileName
     */
    ANALYZE_MATCHER: /^Analyze(?:Shallow)?\s(.*\/(.*\.(?:m|mm|cc|cpp|c|cxx)))\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * @regex Captured groups
     * `$1` target
     * `$2` project
     * `$3` configuration
     */
    BUILD_TARGET_MATCHER: /^=== BUILD TARGET\s(.*)\sOF PROJECT\s(.*)\sWITH.*CONFIGURATION\s(.*)\s===/m,
    /**
     * @regex Captured groups
     * `$1` target
     * `$2` project
     * `$3` configuration
     */
    AGGREGATE_TARGET_MATCHER: /^=== BUILD AGGREGATE TARGET\s(.*)\sOF PROJECT\s(.*)\sWITH.*CONFIGURATION\s(.*)\s===/m,
    /**
     * @regex Captured groups
     * `$1` target
     * `$2` project
     * `$3` configuration
     */
    ANALYZE_TARGET_MATCHER: /^=== ANALYZE TARGET\s(.*)\sOF PROJECT\s(.*)\sWITH.*CONFIGURATION\s(.*)\s===/m,
    CHECK_DEPENDENCIES_MATCHER: /^Check dependencies/m,
    /**
     * @regex Captured groups
     * `$1` command path
     * `$2` arguments
     */
    SHELL_COMMAND_MATCHER: /^\s{4}(cd|setenv|(?:[\w/:\\\s\-.]+?\/)?[\w-]+)\s(.*)$/m,
    /**
     * @regex Nothing returned here for now
     */
    CLEAN_REMOVE_MATCHER: /^Clean.Remove/m,
    /**
     * @regex Captured groups
     * `$1` target
     * `$2` project
     * `$3` configuration
     */
    CLEAN_TARGET_MATCHER: /^=== CLEAN TARGET\s(.*)\sOF PROJECT\s(.*)\sWITH CONFIGURATION\s(.*)\s===/m,
    /**
     * @regex Captured groups
     * `$1` = file
     * `$2` fileName (e.g. Exponent.app)
     * `$3` target (e.g. ABI39_0_0EXAdsFacebook)
     * `$4` project (e.g. ABI39_0_0)
     */
    CODESIGN_MATCHER: /^CodeSign\s((?:\\.|[^ ])+\/((?:\\.|[^ ])+\.(?:\w+)))\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * @regex Captured groups
     * `$1` = file
     */
    CODESIGN_FRAMEWORK_MATCHER: /^CodeSign\s((?:\\.|[^ ])+\/((?:\\.|[^ ])+\.framework))\/Versions\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * @regex Captured groups
     * `$1` type
     * `$2` filePath
     * `$3` fileName (e.g. KWNull.m)
     * `$4` target (e.g. ABI39_0_0EXAdsFacebook)
     * `$5` project (e.g. ABI39_0_0)
     *
     * The order of extensions is important in order to make alternation greedier.
     */
    COMPILE_MATCHER: /^(Compile[\w]+)\s.+?\s((?:\\.|[^ ])+\/((?:\\.|[^ ])+\.(?:mm|m|cpp|cxx|cc|c|swift)))\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * @regex Captured groups
     * `$1` compiler_command
     * `$2` filePath
     */
    COMPILE_COMMAND_MATCHER: /^\s*(.*clang\s.*\s-c\s(.*\.(?:m|mm|c|cc|cpp|cxx))\s.*\.o)$/m,
    /**
     * @regex Captured groups
     * `$1` filePath
     * `$2` fileName (e.g. MainMenu.xib)
     */
    COMPILE_XIB_MATCHER: /^CompileXIB\s(.*\/(.*\.xib))\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * @regex Captured groups
     * `$1` filePath
     * `$2` fileName (e.g. Main.storyboard)
     */
    COMPILE_STORYBOARD_MATCHER: /^CompileStoryboard\s(.*\/([^/].*\.storyboard))\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * `$1` type of copy
     * `$2` file path 1
     * `$3` file path 2
     * `$4` target
     * `$5` project
     */
    ANY_COPY_MATCHER: /^(CpResource|CopyStringsFile|CopyPlistFile|CpHeader|PBXCp)\s(\/?.*\/(?:.*\.\w+))\s(\/?.*\/(?:.*\.\w+))\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\))?/m,
    /**
     * `CompileSwiftSources normal x86_64 com.apple.xcode.tools.swift.compiler (in target 'expo-dev-menu-interface' from project 'Pods')`
     */
    COMPILE_SWIFT_SOURCES_MATCHER: /^(CompileSwiftSources)\s([^\s]+) ([^\s]+) ([^\s]+) (?:\(in\s.*target '([^']*)'.*project '([^']*)'\))?/m,
    /**
     * `EmitSwiftModule normal x86_64 (in target 'expo-dev-menu-interface' from project 'Pods')`
     */
    EMIT_SWIFT_MODULE_MATCHER: /^(EmitSwiftModule)\s([^\s]+) ([^\s]+) (?:\(in\s.*target '([^']*)'.*project '([^']*)'\))?/m,
    EXECUTED_MATCHER: /^\s*Executed/m,
    /**
     * @regex Captured groups
     * `$1` = whole message.
     *
     * `remark: Incremental compilation has been disabled: it is not compatible with whole module optimization`
     */
    REMARK_MATCHER: /^remark: (.*)$/m,
    /**
     * @regex Captured groups
     * `$1` = file
     * `$2` = test_suite
     * `$3` = test_case
     * `$4` = reason
     */
    FAILING_TEST_MATCHER: /^\s*(.+:\d+):\serror:\s[+-]\[(.*)\s(.*)\]\s:(?:\s'.*'\s\[FAILED\],)?\s(.*)/m,
    /**
     * @regex Captured groups
     * `$1` = file
     * `$2` = reason
     */
    UI_FAILING_TEST_MATCHER: /^\s{4}t = \s+\d+\.\d+s\s+Assertion Failure: (.*:\d+): (.*)$/m,
    /**
     * @regex Captured groups
     */
    RESTARTING_TESTS_MATCHER: /^Restarting after unexpected exit or crash in.+$/m,
    /**
     * @regex Captured groups
     * `$1` = dsym
     */
    GENERATE_DSYM_MATCHER: /^GenerateDSYMFile (\/.*\/(.*\.dSYM))\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * @regex Captured groups
     * `$1` = library
     */
    LIBTOOL_MATCHER: /^Libtool\s(.*\/(.*\.a))\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * @regex Captured groups
     * `$1` = targetName
     * `$2` = build_variants (normal, profile, debug)
     * `$3` = architecture
     */
    LINKING_MATCHER: /^Ld (\/?.*\/(.+?(?:[^\\](?=\s)))) ([^(|\s]*)(?:\s([^(|\s]*)\s)?\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = test_case
     * `$3` = time
     */
    TEST_CASE_PASSED_MATCHER: /^\s*Test Case\s'-\[(.*)\s(.*)\]'\spassed\s\((\d*\.\d{3})\sseconds\)/m,
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = test_case
     */
    TEST_CASE_STARTED_MATCHER: /^Test Case '-\[(.*) (.*)\]' started.$/m,
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = test_case
     */
    TEST_CASE_PENDING_MATCHER: /^Test Case\s'-\[(.*)\s(.*)PENDING\]'\spassed/m,
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = test_case
     * `$3` = time
     */
    TEST_CASE_MEASURED_MATCHER: /^[^:]*:[^:]*:\sTest Case\s'-\[(.*)\s(.*)\]'\smeasured\s\[Time,\sseconds\]\saverage:\s(\d*\.\d{3}),/m,
    PHASE_SUCCESS_MATCHER: /^\*\*\s(.*)\sSUCCEEDED\s\*\*(?:\s+\[(.*)\])?/m,
    /**
     * @regex Captured groups
     * `$1` = script_name
     */
    PHASE_SCRIPT_EXECUTION_MATCHER: /^PhaseScriptExecution\s((?:\\ |\S)*)\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\))?/m,
    /**
     * @regex Captured groups
     * `$1` = file
     * `$1` = target
     * `$1` = project
     */
    PROCESS_PCH_MATCHER: /^ProcessPCH(?:\+\+)? (\/?.*\/([^(|\s|\n]*(?:.pch.(?:g|p)ch)))(?:\s(.*.pch))? ([^(|\s]*)(?:\s([^(|\s]*)\s)?\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * @regex Captured groups
     * `$1` filePath
     */
    PROCESS_PCH_COMMAND_MATCHER: /^\s*.*\/usr\/bin\/clang\s.*\s-c\s(.*)\s-o\s.*/m,
    /**
     * @regex Captured groups
     * `$1` = file
     */
    PREPROCESS_MATCHER: /^Preprocess\s(?:(?:\\ |[^ ])*)\s((?:\\ |[^ ])*)$/m,
    /**
     * @regex Captured groups
     * `$1` = file
     */
    PBXCP_MATCHER: /^PBXCp\s((?:\\ |[^ ])*)/m,
    /**
     * @regex Captured groups
     * `$1` = file
     */
    PROCESS_INFO_PLIST_MATCHER: /^ProcessInfoPlistFile\s.*\.plist\s(.*\/+(.*\.plist))\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = time
     */
    TESTS_RUN_COMPLETION_MATCHER: /^\s*Test Suite '(?:.*\/)?(.*[ox]ctest.*)' (finished|passed|failed) at (.*)/m,
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = time
     */
    TEST_SUITE_STARTED_MATCHER: /^\s*Test Suite '(?:.*\/)?(.*[ox]ctest.*)' started at(.*)/m,
    /**
     * @regex Captured groups
     * `$1` test suite name
     */
    TEST_SUITE_START_MATCHER: /^\s*Test Suite '(.*)' started at/m,
    /**
     * @regex Captured groups
     * `$1` fileName
     */
    TIFFUTIL_MATCHER: /^TiffUtil\s(.*)/m,
    /**
     * @regex Captured groups
     * `$1` filePath
     * `$2` fileName
     */
    TOUCH_MATCHER: /^Touch\s(.*\/([^(|\n]+))\s?[^(]+(?:\(in\s.*target '([^']*)'.*project '([^']*)'\))?/m,
    /**
     * @regex Captured groups
     * `$1` filePath
     */
    WRITE_FILE_MATCHER: /^write-file\s(.*)/m,
    WRITE_AUXILIARY_FILES: /^Write auxiliary files/m,
    Warnings: {
        /**
         * @regex Captured groups
         * `$1` = filePath
         * `$2` = fileName
         * `$3` = reason
         */
        COMPILE_WARNING_MATCHER: /^(\/.+\/(.*):.*:.*):\swarning:\s(.+?(?=\(in)?)(?:\(in target '([^']*)' from project '([^']*)'\))?$/m,
        COMPILE_WARNING_INLINE_MATCHER: /^(\/.+\/(.*):.*:.*):\swarning:\s(.+?(?=\(in)?)(?:\(in target '([^']*)' from project '([^']*)'\))$/m,
        /**
         * @regex Captured groups
         * `$1` = ld prefix
         * `$2` = warning message
         */
        LD_WARNING_MATCHER: /^(ld: )warning: (.*)/m,
        /**
         * @regex Captured groups
         * `$1` = whole warning
         */
        GENERIC_WARNING_MATCHER: /^warning:\s(.*)$/m,
        /**
         * @regex Captured groups
         * `$1` = filePath
         */
        MISSING_FILE_COMPILER_WARNING_MATCHER: /(.*): No such file or directory$/m,
        /**
         * @regex Captured groups
         * `$1` filePath
         * `$2` fileName
         */
        VERSION_MISMATCH: /^The\s(\w*)\s.*'([^']*)'.*to (\d+\.?\d+\.?\d*),.*(\d+\.?\d+\.?\d*) to (\d+\.?\d+\.?\d*).\s.*target '([^']*)'.*project '([^']*)'/m,
        /**
         * @regex Captured groups
         */
        MISSING_ARCHITECTURE: /^\[CP\] Vendored binary\s'([^']*)'.*contains architectures \(([\w\d\s]+)\) none of which match the current build architectures \(([\w\d\s]+)\)/m,
        /**
         * @regex Captured groups
         * `$1` buildPhase
         * `$2` filePath
         * `$3` target
         * `$4` project
         */
        SKIPPING_DUPLICATE_FILE: /^Skipping duplicate build file in ([A-Za-z\s]+) build phase: (.*) \(in\s.*target '([^']*)'.*project '([^']*)'/m,
        /**
         * @regex Captured groups
         * `$1` reservedFileDescription (Info.plist or entitlements)
         * `$2` filePath
         * `$3` target
         * `$4` project
         */
        TARGETS_FILE_INCLUDED: /^The Copy Bundle Resources build phase contains this target's (.*) file\s?'(.*)'. \(in\s.*target '([^']*)'.*project '([^']*)'/m,
        /**
         * @regex Captured groups
         * `$1` = whole warning
         */
        WILL_NOT_BE_CODE_SIGNED_MATCHER: /^(.* will not be code signed because .*)$/m,
        /**
         * @regex Captured groups
         * `$1` = whole warning
         */
        LINKER_METHOD_OVERRIDE: /method '(.*)' in category from (?:(.*\/(?:.*\.\w))(?:\((.*\.\w)\)))\soverrides method from class in (?:(.*\/(?:.*\.\w))(?:\((.*\.\w)\)))/m,
    },
    Errors: {
        /**
         * @regex Captured groups
         * `$1` = whole error
         */
        CLANG_ERROR_MATCHER: /^(clang: error:.*)$/m,
        /**
         * @regex Captured groups
         * `$1` = whole error
         */
        CHECK_DEPENDENCIES_ERRORS_MATCHER: /^(Code\s?Sign error:.*|Code signing is required for product type .* in SDK .*|No profile matching .* found:.*|Provisioning profile .* doesn't .*|Swift is unavailable on .*|.?Use Legacy Swift Language Version.*)$/m,
        /**
         * @regex Captured groups
         * `$0` = whole error
         * `$1` = profile name
         * `$2` = entitlement name
         * `$3` = entitlement type <capability|entitlement>
         * `$4` = native target
         * `$5` = native project
         */
        UNSUPPORTED_ENTITLEMENT_MATCHER: /^error: Provisioning profile (.*) doesn't (?:support|include) the (.*) (capability|entitlement)\.(?:\s\(in\s.*target '([^']*)'.*project '([^']*)'\)$)?/m,
        /**
         * @regex Captured groups
         * `$1` = whole error
         */
        PROVISIONING_PROFILE_REQUIRED_MATCHER: /^(.*requires a provisioning profile.*)$/m,
        /**
         * @regex Captured groups
         * `$1` = whole error
         */
        NO_CERTIFICATE_MATCHER: /^(No certificate matching.*)$/m,
        /**
         * @regex Captured groups
         * `$1` = filePath
         * `$2` = fileName
         * `$3` = reason
         */
        COMPILE_ERROR_MATCHER: /^(\/.+\/(.*):.*:.*):\s(?:fatal\s)?error:\s(.+?(?=\(in)?)(?:\(in target '([^']*)' from project '([^']*)'\))?$/m,
        COMPILE_ERROR_INLINE_MATCHER: /^(\/.+\/(.*):.*:.*):\s(?:fatal\s)?error:\s(.+?(?=\(in)?)(?:\(in target '([^']*)' from project '([^']*)'\))$/m,
        /**
         * @regex Captured groups
         * `$1` cursor (with whitespaces and tildes)
         */
        CURSOR_MATCHER: /^([\s~]*\^[\s~]*)$/m,
        /**
         * @regex Captured groups
         * `$1` = whole error.
         *
         * Appears to be related to the installation of files on the connected device
         */
        RSYNC_ERROR_MATCHER: /^(rsync error:.*)$/m,
        /**
         * @regex Captured groups
         * `$1` = whole error.
         * it varies a lot, not sure if it makes sense to catch everything separately
         */
        FATAL_ERROR_MATCHER: /^(fatal error:.*)$/m,
        /**
         * @regex Captured groups
         * `$1` = whole error.
         * `$2` = file path
         */
        FILE_MISSING_ERROR_MATCHER: /^<unknown>:0:\s(error:\s.*)\s'(\/.+\/.*\..*)'$/m,
        /**
         * @regex Captured groups
         * `$1` = whole error
         */
        LD_ERROR_MATCHER: /^(ld:.*)/m,
        /**
         * @regex Captured groups
         * `$1` file path
         */
        LINKER_DUPLICATE_SYMBOLS_LOCATION_MATCHER: /^\s+(\/.*\.o[)]?)$/m,
        /**
         * @regex Captured groups
         * `$1` reason
         */
        LINKER_DUPLICATE_SYMBOLS_MATCHER: /^((duplicate symbol|ld: warning: duplicate symbol) .*):$/m,
        /**
         * @regex Captured groups
         * `$1` symbol location
         */
        LINKER_UNDEFINED_SYMBOL_LOCATION_MATCHER: /^(.* in .*\.o[)]?)$/m,
        /**
         * @regex Captured groups
         * `$1` reason
         */
        LINKER_UNDEFINED_SYMBOLS_MATCHER: /^(Undefined symbols for architecture .*):$/m,
        /**
         * @regex Captured groups
         * `$1` reason
         */
        PODS_ERROR_MATCHER: /^(error:\s.*)/m,
        /**
         * @regex Captured groups
         * `$1` = reference
         */
        SYMBOL_REFERENCED_FROM_MATCHER: /\s+"(.*)", referenced from:$/m,
        /**
         * @regex Captured groups
         * `$1` = error reason
         */
        MODULE_INCLUDES_ERROR_MATCHER: /^<module-includes>:.*?:.*?:\s(?:fatal\s)?(error:\s.*)$/m,
    },
};
//# sourceMappingURL=Matchers.js.map