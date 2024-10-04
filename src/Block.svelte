<script lang="ts">
    import qs from "qs";
    export let userId: number;
    export let size: string;

    let isBlocked: boolean = false;

    const cookies: Record<string, string> = {};
    document.cookie.split(";").forEach((cookie) => {
        const [key, value] = cookie.split("=");
        cookies[key.trim()] = value.trim();
    });

    checkBlockStatus(userId);

    async function checkBlockStatus(userId: number): Promise<void> {
        let fetchedResult = await (
            await fetch(`https://www.wikidot.com/ajax-module-connector.php`, {
                method: "POST",
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    Accept: "*/*",
                    Connection: "keep-alive",
                    Host: "www.wikidot.com",
                    Origin: "https://www.wikidot.com",
                    Referer: "https://www.wikidot.com",
                    Cookie: `WIKIDOT_SESSION_ID=${cookies.WIKIDOT_SESSION_ID}; wikidot_token7=${cookies.wikidot_token7}`,
                },
                body: qs.stringify({
                    moduleName: "dashboard/messages/DMSettingsModule",
                    callbackIndex: 0,
                    wikidot_token7: cookies.wikidot_token7,
                }),
            })
        ).json();

        fetchedResult.body
            .match(/WIKIDOT.modules.DMSettingsModule.listeners.deleteBlock\(event\, \d+\, '[\w- ]+'\);/g)
            .forEach((result: string) => {
                if (result.includes(userId.toString())) {
                    isBlocked = true;
                }
            });
    }

    async function blockUser(userId: number): Promise<void> {
        await fetch(`https://www.wikidot.com/ajax-module-connector.php`, {
            method: "POST",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Accept: "*/*",
                Connection: "keep-alive",
                Host: "www.wikidot.com",
                Origin: "https://www.wikidot.com",
                Referer: "https://www.wikidot.com",
                Cookie: `WIKIDOT_SESSION_ID=${cookies.WIKIDOT_SESSION_ID}; wikidot_token7=${cookies.wikidot_token7}`,
            },
            body: qs.stringify({
                userId,
                action: "DashboardSettingsAction",
                event: "blockUser",
                moduleName: "Empty",
                callbackIndex: 0,
                wikidot_token7: cookies.wikidot_token7,
            }),
        });
    }

    async function unBlockUser(userId: number): Promise<void> {
        await fetch(`https://www.wikidot.com/ajax-module-connector.php`, {
            method: "POST",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Accept: "*/*",
                Connection: "keep-alive",
                Host: "www.wikidot.com",
                Origin: "https://www.wikidot.com",
                Referer: "https://www.wikidot.com",
                Cookie: `WIKIDOT_SESSION_ID=${cookies.WIKIDOT_SESSION_ID}; wikidot_token7=${cookies.wikidot_token7}`,
            },
            body: qs.stringify({
                userId,
                action: "DashboardSettingsAction",
                event: "deleteBlock",
                moduleName: "Empty",
                callbackIndex: 0,
                wikidot_token7: cookies.wikidot_token7,
            }),
        });
    }
</script>

{#if isBlocked}
    <a
        href="javascript:;"
        class="btn btn-success block btn-{size} pull-right"
        on:click={async () => {
            await unBlockUser(userId);
            isBlocked = false;
        }}>取消屏蔽</a
    >
{:else}
    <a
        href="javascript:;"
        class="btn btn-danger block btn-{size} pull-right"
        on:click={async () => {
            await blockUser(userId);
            isBlocked = true;
        }}>屏蔽此用户</a
    >
{/if}

<style lang="scss">
    .block {
        margin-right: 5px;
    }
</style>
