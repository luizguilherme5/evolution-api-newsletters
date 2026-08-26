ARG BASE_IMAGE=evoapicloud/evolution-api@sha256:b4a18ed5213d34a0845f841ba9afae1b67940457d021b42af863eae67dc2cfbd
FROM ${BASE_IMAGE}

LABEL org.opencontainers.image.title="Evolution API with opt-in newsletter capture"
LABEL org.opencontainers.image.description="Minimal overlay that allows WhatsApp newsletter JIDs when explicitly enabled"
LABEL org.opencontainers.image.source="https://github.com/luizguilherme5/evolution-api-newsletters"

COPY patch-newsletter-filter.cjs /tmp/patch-newsletter-filter.cjs
RUN node /tmp/patch-newsletter-filter.cjs && rm /tmp/patch-newsletter-filter.cjs

ENV CONFIG_SESSION_PHONE_READ_NEWSLETTERS=false
