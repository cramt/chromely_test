using Chromely.CefGlue.Winapi;
using Chromely.CefGlue.Winapi.ChromeHost;
using Chromely.Core;
using Chromely.Core.Helpers;
using System;
using WinApi.Windows;

namespace chromely_test {
    class Program {
        static int Main(string[] args) {
            string startUrl = "https://www.google.com/";

            ChromelyConfiguration config = ChromelyConfiguration.Create().WithAppArgs(args).WithHostSize(1000, 600).WithCustomSetting(CefSettingKeys.SingleProcess, true).WithStartUrl(startUrl);

            WindowFactory factory = WinapiHostFactory.Init();
            using (CefGlueBrowserHost window = factory.CreateWindow(() => new CefGlueBrowserHost(config),
                  "chromely", constructionParams: new FrameWindowConstructionParams())) {
                window.SetSize(config.HostWidth, config.HostHeight);
                window.CenterToScreen();
                window.Show();
                return new EventLoop().Run(window);
            }
        }
    }
}
