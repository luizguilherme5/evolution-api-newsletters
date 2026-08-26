# Evolution API newsletter capture overlay

This image inherits the exact production base image digest for Evolution API
`2.4.0-rc2` and applies one opt-in change: WhatsApp newsletter JIDs are no longer
ignored. The dedicated newsletter image enables this behavior by default.

Set `CONFIG_SESSION_PHONE_READ_NEWSLETTERS=false` to restore the upstream filter
without changing images. The overlay does not change sending, database schemas,
Redis, sessions, volumes, or webhook configuration.

## Production image

```text
ghcr.io/luizguilherme5/evolution-api-newsletters:2.4.0-rc2-newsletters.2
```

The Coolify deployment also uses the compatibility tag
`2.4.0-rc2-newsletters.1`; both tags point to the same verified build.

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
