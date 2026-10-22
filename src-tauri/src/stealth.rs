/// Master switch for Pluely's stealth features.
///
/// When `true` (the original behaviour):
/// - windows are hidden from screen sharing / screenshots (content protection)
/// - the overlay has no title bar and no taskbar icon
///
/// When `false` (development mode): the overlay gets a normal title bar with
/// minimize, shows in the taskbar, and can be captured in screenshots.
///
/// The frontend has a matching `STEALTH_MODE` in `src/config/constants.ts`.
pub const STEALTH_MODE: bool = false;
