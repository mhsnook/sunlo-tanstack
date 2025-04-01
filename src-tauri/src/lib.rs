#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
          #[cfg(desktop)]
          app.deep_link().register("sunlo")?;
          Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
