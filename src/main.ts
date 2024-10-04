import Block from "./Block.svelte";

let isUserInfo: boolean = false;
let userInfoAppended: boolean = false;
let isUserProfile: boolean = false;
let userProfileAppended: boolean = false;

setInterval((): void => {
    isUserProfile = document.querySelector(".col-md-12 #page-content .col-md-9 #user-info-area") != null;
    if (isUserProfile) {
        if (
            !userProfileAppended ||
            (userProfileAppended && document.querySelector(".col-md-12 #page-content .col-md-9 .btn.block") == null)
        ) {
            appendUserProfile();
        }
        userProfileAppended = true;
    } else {
        userProfileAppended = false;
    }

    if (document.querySelector(".col-md-12 #page-content .col-md-9 .pull-right + .block") == null) {
        document
            .querySelector('.col-md-12 #page-content .col-md-9 .btn-danger[onclick*="flagUser"]')
            ?.insertAdjacentElement(
                "afterend",
                document.querySelector(".col-md-12 #page-content .col-md-9 .btn.block") as Element
            );
    }

    isUserInfo =
        document.querySelector("#odialog-container .owindow .title ~ #user-abuse-report-button-hovertip") != null;
    if (isUserInfo) {
        if (
            !userInfoAppended ||
            (userInfoAppended &&
                document.querySelector(
                    '#odialog-container .owindow .content.modal-body div[style*="margin-top"] .btn.block'
                ) == null)
        ) {
            appendUserInfo();
        }
        userInfoAppended = true;
    } else {
        userInfoAppended = false;
    }
}, 1000);

function appendUserProfile(): void {
    const userProfile: HTMLDivElement | null = document.querySelector(".col-md-12 #page-content .col-md-9");

    userProfile
        ? new Block({
              target: userProfile,
              props: {
                  userId: parseInt(
                      document
                          .querySelector('.col-md-12 #page-content .col-md-9 .profile-title img[src*="avatar.php"]')
                          ?.attributes.getNamedItem("src")
                          ?.textContent?.split("?")[1]
                          ?.split("&")[0]
                          ?.split("=")[1] ?? ""
                  ),
                  size: "xs",
              },
          })
        : "";

    document
        .querySelector('.col-md-12 #page-content .col-md-9 .btn-danger[onclick*="flagUser"]')
        ?.insertAdjacentElement(
            "afterend",
            document.querySelector(".col-md-12 #page-content .col-md-9 .btn.block") as Element
        );
}

function appendUserInfo(): void {
    const userInfo: HTMLDivElement | null = document.querySelector(
        '#odialog-container .owindow .content.modal-body div[style*="margin-top"]'
    );

    userInfo
        ? new Block({
              target: userInfo,
              props: {
                  userId: parseInt(
                      document
                          .querySelector('#odialog-container .owindow .content.modal-body img[src*="avatar.php"]')
                          ?.attributes.getNamedItem("src")
                          ?.textContent?.split("?")[1]
                          ?.split("&")[0]
                          ?.split("=")[1] ?? ""
                  ),
                  size: "sm",
              },
          })
        : "";
}
