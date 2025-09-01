import prisma from "../config/db.js";
import { generateShortCode } from "../utils/generateCodes.js";

export const shorten = async (url) => {
  const shortCode = generateShortCode();
  const shortUrl = await prisma.url.create({
    data: { url, shortCode },
  });

  if (!shortUrl) {
    return {
        success: false,
        message: "Failed to create short URL",
    };
  }

  return { success: true, message: "URL created", url: shortUrl };
};

async function incrementAccessCount(shortCode) {
  await prisma.url.update({
    where: { shortCode },
    data: { accessCount: { increment: 1 } },
  });
}

export const getUrlByShortCode = async (shortCode) => {
  incrementAccessCount(shortCode);
  
  const url = await prisma.url.findUnique({
    where: { shortCode },
  });

  if (!url) {
    return {
      success: false,
      message: "URL not found",
    };
  }

  return { success: true, message: "URL found", url };
};

export const update = async (shortCode, newUrl) => {
  const updatedUrl = await prisma.url.update({
    where: { shortCode },
    data: { url: newUrl },
  });

  if (!updatedUrl) {
    return {
      success: false,
      message: "Failed to update URL",
    };
  }

  return { success: true, message: "URL updated", url: updatedUrl };
};

export const deleteUrl = async (shortCode) => {

  const url = await prisma.url.findUnique({
    where: { shortCode },
  });

  if (!url) {
    return {
      success: false,
      message: "URL not found",
    };
  }

  await prisma.url.delete({
    where: { shortCode },
  });

  return { success: true, message: "URL deleted" };
};

export const getStats = async (shortCode) => {
  const url = await prisma.url.findUnique({
    where: { shortCode }
  });

  if (!url) {
    return {
      success: false,
      message: "URL not found",
    };
  }

  return { success: true, message: "Stats retrieved", stats: url };
}
