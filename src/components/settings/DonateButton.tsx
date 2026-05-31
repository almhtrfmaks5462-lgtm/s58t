/*
 * S7Cord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Button } from "@components/Button";
import { Heart } from "@components/Heart";
import { OpenExternalIcon } from "@components/Icons";
import { openInviteModal } from "@utils/discord";
import { ButtonProps } from "@S7Cord/discord-types";
import { showToast } from "@webpack/common";

export function DonateButton({
    S7Cord = false,
    className,
    ...props
}: Partial<ButtonProps> & { S7Cord?: boolean; }) {
    const link = S7Cord ? "https://github.com/sponsors/thororen1234" : "https://github.com/sponsors/Vendicated";
    return (
        <Button
            {...props}
            variant="none"
            size="medium"
            type="button"
            onClick={() => S7CordNative.native.openExternal(link)}
            className={className || "vc-donate-button"}
        >
            <Heart />
            Donate
        </Button>
    );
}

export function InviteButton({
    className,
    ...props
}: Partial<ButtonProps>) {
    return (
        <Button
            {...props}
            variant="none"
            size="medium"
            type="button"
            onClick={async e => {
                e.preventDefault();
                openInviteModal("wKgT9j2xfN").catch(() =>
                    showToast("Invalid or expired invite"),
                );
            }}
            className={className || "vc-donate-button"}
        >
            Invite
            <OpenExternalIcon className="vc-invite-link" />
        </Button>
    );
}

export function TranslateButton({
    className,
    ...props
}: Partial<ButtonProps>) {
    const link = "https://weblate.S7Cord.org/projects/S7Cord/";
    return (
        <Button
            {...props}
            variant="none"
            size="medium"
            type="button"
            onClick={() => S7CordNative.native.openExternal(link)}
            className={className || "vc-translate-button"}
        >
            Translate Here
        </Button>
    );
}
