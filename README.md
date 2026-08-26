# Evolution API newsletter capture overlay

This image inherits the exact functional production image exported on
2026-08-25 (`evolution-api:2.4.0-rc2-newsletter-20260825`) and applies one
additional change: WhatsApp newsletter JIDs are no longer ignored. The
dedicated newsletter image enables this behavior by default.

Set `CONFIG_SESSION_PHONE_READ_NEWSLETTERS=false` to restore the upstream filter
without changing images. The overlay does not change sending, database schemas,
Redis, sessions, volumes, or webhook configuration.

## Production image

```text
ghcr.io/luizguilherme5/evolution-api-newsletters:2.4.0-rc2-newsletters.3
```

The Coolify deployment uses the compatibility tag
`2.4.0-rc2-newsletters.1`; it points to the same verified build as `.3`.

The exact unmodified functional base is also published as `legacy-20260825`.

## Runtime switch

```text
CONFIG_SESSION_PHONE_READ_NEWSLETTERS=true
```

This is already the image default. Set it to `false` to disable channel capture.

## Rollback

Restore the previous image:

```text
evoapicloud/evolution-api:2.4.0-rc2
```

No data migration is involved.
