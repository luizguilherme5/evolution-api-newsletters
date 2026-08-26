# Evolution API newsletter capture overlay

This image inherits the exact production base image digest for Evolution API
`2.4.0-rc2` and applies one opt-in change: WhatsApp newsletter JIDs are no longer
ignored when `CONFIG_SESSION_PHONE_READ_NEWSLETTERS=true`.

The default remains `false`, preserving the upstream behavior. The overlay does
not change sending, database schemas, Redis, sessions, volumes, or webhook
configuration.

## Production image

```text
ghcr.io/luizguilherme5/evolution-api-newsletters:2.4.0-rc2-newsletters.1
```

## Required runtime variable

```text
CONFIG_SESSION_PHONE_READ_NEWSLETTERS=true
```

## Rollback

Restore the previous image:

```text
evoapicloud/evolution-api:2.4.0-rc2
```

No data migration is involved.
