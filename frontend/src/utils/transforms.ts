import { ImageFragment, UrlFragment } from "src/graphql";

export const formatCareer = (
  start?: number | null,
  end?: number | null
): string | undefined =>
  start || end ? `Active ${start ?? "????"}\u2013${end ?? ""}` : undefined;

export const formatMeasurements = ({
  cup_size_us,
  band_size_us,
  hip_size_us,
  waist_size_us,
  cup_size_jp,
  band_size_jp,
  hip_size_jp,
  waist_size_jp
}: {
  cup_size_us?: string | null;
  band_size_us?: number | null;
  waist_size_us?: number | null;
  hip_size_us?: number | null;
  cup_size_jp?: string | null;
  band_size_jp?: number | null;
  waist_size_jp?: number | null;
  hip_size_jp?: number | null;
}): string | undefined => {
  let size_jp = undefined
  if ((cup_size_jp && band_size_jp) || hip_size_jp || waist_size_jp) {
    const bust = cup_size_jp && band_size_jp ? `${band_size_jp}${cup_size_jp}` : "??";
    size_jp = `${bust}-${waist_size_jp ?? "??"}-${hip_size_jp ?? "??"}`;
  }
  let size_us = undefined
  if ((cup_size_us && band_size_us) || hip_size_us || waist_size_us) {
    const bust = cup_size_us && band_size_us ? `${band_size_us}${cup_size_us}` : "??";
    size_us = `${bust}-${waist_size_us ?? "??"}-${hip_size_us ?? "??"}`;
  }

  if (size_us && size_jp) {
    return `JP ${size_jp} (US ${size_us})`
  }
  if (size_jp) {
    return `JP ${size_jp}`
  }
  if (size_us) {
    return `US ${size_us}`
  }

  return undefined;
};

export const getBraSize = (
  cup_size: string | null | undefined,
  band_size: number | null | undefined
): string | undefined =>
  band_size && cup_size ? `${band_size}${cup_size}` : undefined;

export const sortImageURLs = (
  urls: ImageFragment[],
  orientation: "portrait" | "landscape"
) =>
  urls
    .map((u) => ({
      ...u,
      aspect:
        orientation === "portrait"
          ? u.height / u.width > 1
          : u.width / u.height > 1,
    }))
    .sort((a, b) => {
      if (a.aspect > b.aspect) return -1;
      if (a.aspect < b.aspect) return 1;
      if (orientation === "portrait" && a.height > b.height) return -1;
      if (orientation === "portrait" && a.height < b.height) return 1;
      if (orientation === "landscape" && a.width > b.width) return -1;
      if (orientation === "landscape" && a.width < b.width) return 1;
      return 0;
    });

export const getImage = (
  urls: ImageFragment[],
  orientation: "portrait" | "landscape"
) => {
  const images = sortImageURLs(urls, orientation);
  return images?.[0]?.url ?? "";
};

export const imageType = (image?: ImageFragment) => {
  if (image && image.height > image.width) {
    return `vertical-img`;
  } else {
    return `horizontal-img`;
  }
};

export const getUrlBySite = (urls: UrlFragment[], name: string) =>
  (urls && (urls.find((url) => url.site.name === name) || {}).url) || "";

export const formatBodyModification = (
  bodyMod?: { location: string; description?: string | null } | null
) =>
  bodyMod
    ? bodyMod.location +
      (bodyMod.description ? ` (${bodyMod.description})` : "")
    : null;

export const formatBodyModifications = (
  bodyMod?: { location: string; description?: string | null }[] | null
) => (bodyMod ?? []).map(formatBodyModification).join(", ");

export const formatPendingEdits = (count?: number) =>
  count ? ` (${count} Pending)` : "";

export const formatDuration = (dur?: number | null) => {
  if (!dur) return "";
  let value = dur;
  let hour = 0;
  let minute = 0;
  let seconds = 0;
  if (value >= 3600) {
    hour = Math.floor(value / 3600);
    value -= hour * 3600;
  }
  minute = Math.floor(value / 60);
  value -= minute * 60;
  seconds = value;

  const res = [
    minute.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ];
  if (hour) res.unshift(hour.toString());
  return res.join(":");
};

export const parseDuration = (
  dur: string | null | undefined
): number | null => {
  if (!dur) return null;

  const regex = /^((?<hours>\d+:)?(?<minutes>[0-5]?\d):)?(?<seconds>[0-5]?\d)$/;
  const matches = regex.exec(dur);
  const hours = matches?.groups?.hours ?? "0";
  const minutes = matches?.groups?.minutes ?? "0";
  const seconds = matches?.groups?.seconds ?? "0";

  const duration =
    Number.parseInt(seconds, 10) +
    Number.parseInt(minutes, 10) * 60 +
    Number.parseInt(hours, 10) * 3600;
  return duration > 0 ? duration : null;
};

export const parseBraSize = (braSize = ""): [string | null, number | null] => {
  const band = /^\d+/.exec(braSize)?.[0];
  const bandSize = band ? Number.parseInt(band, 10) : null;
  const cup = bandSize ? braSize.replace(bandSize.toString(), "") : null;
  const cupSize = cup
    ? /^[a-zA-Z]+/.exec(cup)?.[0]?.toUpperCase() ?? null
    : null;

  return [cupSize, bandSize];
};
