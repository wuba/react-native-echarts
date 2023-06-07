export declare const Matchers: {
    /**
     * @regex Captured groups
     * `$1` filePath
     * `$2` fileName
     */
    ANALYZE_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` target
     * `$2` project
     * `$3` configuration
     */
    BUILD_TARGET_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` target
     * `$2` project
     * `$3` configuration
     */
    AGGREGATE_TARGET_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` target
     * `$2` project
     * `$3` configuration
     */
    ANALYZE_TARGET_MATCHER: RegExp;
    CHECK_DEPENDENCIES_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` command path
     * `$2` arguments
     */
    SHELL_COMMAND_MATCHER: RegExp;
    /**
     * @regex Nothing returned here for now
     */
    CLEAN_REMOVE_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` target
     * `$2` project
     * `$3` configuration
     */
    CLEAN_TARGET_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = file
     * `$2` fileName (e.g. Exponent.app)
     * `$3` target (e.g. ABI39_0_0EXAdsFacebook)
     * `$4` project (e.g. ABI39_0_0)
     */
    CODESIGN_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = file
     */
    CODESIGN_FRAMEWORK_MATCHER: RegExp;
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
    COMPILE_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` compiler_command
     * `$2` filePath
     */
    COMPILE_COMMAND_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` filePath
     * `$2` fileName (e.g. MainMenu.xib)
     */
    COMPILE_XIB_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` filePath
     * `$2` fileName (e.g. Main.storyboard)
     */
    COMPILE_STORYBOARD_MATCHER: RegExp;
    /**
     * `$1` type of copy
     * `$2` file path 1
     * `$3` file path 2
     * `$4` target
     * `$5` project
     */
    ANY_COPY_MATCHER: RegExp;
    /**
     * `CompileSwiftSources normal x86_64 com.apple.xcode.tools.swift.compiler (in target 'expo-dev-menu-interface' from project 'Pods')`
     */
    COMPILE_SWIFT_SOURCES_MATCHER: RegExp;
    /**
     * `EmitSwiftModule normal x86_64 (in target 'expo-dev-menu-interface' from project 'Pods')`
     */
    EMIT_SWIFT_MODULE_MATCHER: RegExp;
    EXECUTED_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = whole message.
     *
     * `remark: Incremental compilation has been disabled: it is not compatible with whole module optimization`
     */
    REMARK_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = file
     * `$2` = test_suite
     * `$3` = test_case
     * `$4` = reason
     */
    FAILING_TEST_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = file
     * `$2` = reason
     */
    UI_FAILING_TEST_MATCHER: RegExp;
    /**
     * @regex Captured groups
     */
    RESTARTING_TESTS_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = dsym
     */
    GENERATE_DSYM_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = library
     */
    LIBTOOL_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = targetName
     * `$2` = build_variants (normal, profile, debug)
     * `$3` = architecture
     */
    LINKING_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = test_case
     * `$3` = time
     */
    TEST_CASE_PASSED_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = test_case
     */
    TEST_CASE_STARTED_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = test_case
     */
    TEST_CASE_PENDING_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = test_case
     * `$3` = time
     */
    TEST_CASE_MEASURED_MATCHER: RegExp;
    PHASE_SUCCESS_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = script_name
     */
    PHASE_SCRIPT_EXECUTION_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = file
     * `$1` = target
     * `$1` = project
     */
    PROCESS_PCH_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` filePath
     */
    PROCESS_PCH_COMMAND_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = file
     */
    PREPROCESS_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = file
     */
    PBXCP_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = file
     */
    PROCESS_INFO_PLIST_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = time
     */
    TESTS_RUN_COMPLETION_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` = suite
     * `$2` = time
     */
    TEST_SUITE_STARTED_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` test suite name
     */
    TEST_SUITE_START_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` fileName
     */
    TIFFUTIL_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` filePath
     * `$2` fileName
     */
    TOUCH_MATCHER: RegExp;
    /**
     * @regex Captured groups
     * `$1` filePath
     */
    WRITE_FILE_MATCHER: RegExp;
    WRITE_AUXILIARY_FILES: RegExp;
    Warnings: {
        /**
         * @regex Captured groups
         * `$1` = filePath
         * `$2` = fileName
         * `$3` = reason
         */
        COMPILE_WARNING_MATCHER: RegExp;
        COMPILE_WARNING_INLINE_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = ld prefix
         * `$2` = warning message
         */
        LD_WARNING_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = whole warning
         */
        GENERIC_WARNING_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = filePath
         */
        MISSING_FILE_COMPILER_WARNING_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` filePath
         * `$2` fileName
         */
        VERSION_MISMATCH: RegExp;
        /**
         * @regex Captured groups
         */
        MISSING_ARCHITECTURE: RegExp;
        /**
         * @regex Captured groups
         * `$1` buildPhase
         * `$2` filePath
         * `$3` target
         * `$4` project
         */
        SKIPPING_DUPLICATE_FILE: RegExp;
        /**
         * @regex Captured groups
         * `$1` reservedFileDescription (Info.plist or entitlements)
         * `$2` filePath
         * `$3` target
         * `$4` project
         */
        TARGETS_FILE_INCLUDED: RegExp;
        /**
         * @regex Captured groups
         * `$1` = whole warning
         */
        WILL_NOT_BE_CODE_SIGNED_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = whole warning
         */
        LINKER_METHOD_OVERRIDE: RegExp;
    };
    Errors: {
        /**
         * @regex Captured groups
         * `$1` = whole error
         */
        CLANG_ERROR_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = whole error
         */
        CHECK_DEPENDENCIES_ERRORS_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$0` = whole error
         * `$1` = profile name
         * `$2` = entitlement name
         * `$3` = entitlement type <capability|entitlement>
         * `$4` = native target
         * `$5` = native project
         */
        UNSUPPORTED_ENTITLEMENT_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = whole error
         */
        PROVISIONING_PROFILE_REQUIRED_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = whole error
         */
        NO_CERTIFICATE_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = filePath
         * `$2` = fileName
         * `$3` = reason
         */
        COMPILE_ERROR_MATCHER: RegExp;
        COMPILE_ERROR_INLINE_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` cursor (with whitespaces and tildes)
         */
        CURSOR_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = whole error.
         *
         * Appears to be related to the installation of files on the connected device
         */
        RSYNC_ERROR_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = whole error.
         * it varies a lot, not sure if it makes sense to catch everything separately
         */
        FATAL_ERROR_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = whole error.
         * `$2` = file path
         */
        FILE_MISSING_ERROR_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = whole error
         */
        LD_ERROR_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` file path
         */
        LINKER_DUPLICATE_SYMBOLS_LOCATION_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` reason
         */
        LINKER_DUPLICATE_SYMBOLS_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` symbol location
         */
        LINKER_UNDEFINED_SYMBOL_LOCATION_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` reason
         */
        LINKER_UNDEFINED_SYMBOLS_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` reason
         */
        PODS_ERROR_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = reference
         */
        SYMBOL_REFERENCED_FROM_MATCHER: RegExp;
        /**
         * @regex Captured groups
         * `$1` = error reason
         */
        MODULE_INCLUDES_ERROR_MATCHER: RegExp;
    };
};
